"""The memory store: structured organizational memory with provenance,
permissions, and exit rights (open export format).

Retrieval here is deliberately simple keyword scoring; the contract that
matters is the schema and the permission filter. Swap in embeddings later
without changing either.
"""
import json
import re
import time
import uuid
from dataclasses import dataclass, field, asdict

from .permissions import can_read

EXPORT_FORMAT = "open-memory/v1"


@dataclass
class Memory:
    content: str
    kind: str                    # decision | meeting | fact | rationale
    tags: list = field(default_factory=list)
    min_role: str = "analyst"    # lowest tier that may read
    allow_roles: list = field(default_factory=list)  # explicit override
    author: str = "unknown"
    source: str = ""             # provenance: where this came from
    created_at: float = field(default_factory=time.time)
    supersedes: str = None       # id of the memory this replaces
    id: str = field(default_factory=lambda: "mem_" + uuid.uuid4().hex[:10])


def _tokens(text: str) -> set:
    return set(re.findall(r"[a-z0-9]+", text.lower()))


class MemoryStore:
    def __init__(self, org: str):
        self.org = org
        self.memories = []

    # ------------------------------------------------------------- writing
    def remember(self, **kwargs) -> Memory:
        m = Memory(**kwargs)
        self.memories.append(m)
        return m

    # ------------------------------------------------------------- reading
    def recall(self, query: str, *, role: str, k: int = 5) -> list:
        """Permission-filtered retrieval. The filter runs BEFORE scoring:
        a role must never learn that a hidden memory even matched."""
        visible = [m for m in self.memories if can_read(role, m)]
        # superseded memories drop out of recall (but stay in the record)
        superseded = {m.supersedes for m in visible if m.supersedes}
        visible = [m for m in visible if m.id not in superseded]

        q = _tokens(query)
        scored = []
        for m in visible:
            body = _tokens(m.content) | _tokens(" ".join(m.tags))
            overlap = len(q & body)
            if overlap:
                scored.append((overlap / (len(q) or 1), m))
        scored.sort(key=lambda x: (-x[0], -x[1].created_at))
        return [m for _, m in scored[:k]]

    # --------------------------------------------------------- exit rights
    def export(self, path: str):
        """The whole point: memory leaves in an open format."""
        doc = {"format": EXPORT_FORMAT, "org": self.org,
               "exported_at": time.time(),
               "memories": [asdict(m) for m in self.memories]}
        with open(path, "w", encoding="utf-8") as f:
            json.dump(doc, f, indent=2)
        return path

    @classmethod
    def import_(cls, path: str) -> "MemoryStore":
        with open(path, encoding="utf-8") as f:
            doc = json.load(f)
        if doc.get("format") != EXPORT_FORMAT:
            raise ValueError(f"unknown format: {doc.get('format')}")
        store = cls(doc["org"])
        for m in doc["memories"]:
            store.memories.append(Memory(**m))
        return store
