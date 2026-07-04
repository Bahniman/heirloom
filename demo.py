"""Heirloom demo: same question, three roles, three correctly-scoped answers.
Then the memory walks out the door in an open format and lives on.

Run:  python demo.py     (zero dependencies)
"""
from heirloom import MemoryStore

W = 74


def banner(t):
    print("\n" + "=" * W + "\n" + t + "\n" + "=" * W)


def ask(store, query, role):
    hits = store.recall(query, role=role)
    print(f"\n  [{role}] asks: {query!r}")
    if not hits:
        print("    (no memory visible at this role)")
    for m in hits:
        print(f"    - ({m.kind}) {m.content}")


def main():
    org = MemoryStore("Acme Consulting LLP")

    banner("1. A year of institutional memory accumulates")
    org.remember(content="We chose VendorX for the data platform over VendorY.",
                 kind="decision", tags=["vendorx", "data-platform"],
                 min_role="intern", author="S. Rao",
                 source="steering committee, 12 Mar 2025")
    org.remember(content="Real reason for VendorX: VendorY's pricing tripled at "
                         "renewal for Client K; we could not risk the same "
                         "mid-engagement. Their demo was actually better.",
                 kind="rationale", tags=["vendorx", "pricing", "risk"],
                 min_role="manager", author="S. Rao",
                 source="partner sync notes, 12 Mar 2025")
    org.remember(content="VendorX contract has a 40% discount locked until "
                         "2027 in exchange for a case study; do not resell at "
                         "list price internally.",
                 kind="fact", tags=["vendorx", "contract", "pricing"],
                 allow_roles=["exec"], author="finance",
                 source="MSA appendix C")
    org.remember(content="Weekly standup: data migration to VendorX is two "
                         "weeks behind; blocker is Client K's security review.",
                 kind="meeting", tags=["vendorx", "migration", "client-k"],
                 min_role="analyst", author="pm-bot",
                 source="standup 02 Jun 2025")
    print(f"\n  {len(org.memories)} memories, four sensitivity levels, full provenance.")

    banner("2. Same question, three roles: the permission filter IS the product")
    q = "why did we choose VendorX and what should I know about its pricing?"
    ask(org, q, "intern")
    ask(org, q, "manager")
    ask(org, q, "exec")

    banner("3. The person leaves; the memory stays")
    print("\n  S. Rao resigns. Her decisions and rationale remain queryable")
    print("  with provenance ('partner sync notes, 12 Mar 2025'), instead of")
    print("  evaporating with her seat.")

    banner("4. The vendor changes; the memory walks")
    path = org.export("acme_memory.openmemory.json")
    print(f"\n  exported -> {path}  (format: open-memory/v1)")
    org2 = MemoryStore.import_(path)
    hits = org2.recall("vendorx migration blocker", role="analyst")
    print(f"  re-imported into a fresh store: {len(org2.memories)} memories intact")
    print(f"  post-migration recall works: {hits[0].content[:60]}...")

    banner("5. Corrections don't erase history")
    old = org.recall("migration behind", role="analyst")[0]
    org.remember(content="Migration back on track; Client K security review "
                         "cleared 20 Jun.", kind="meeting",
                 tags=["vendorx", "migration"], min_role="analyst",
                 author="pm-bot", supersedes=old.id)
    hits = org.recall("vendorx migration status", role="analyst")
    print(f"\n  latest recall: {hits[0].content}")
    print("  (the superseded memory stays in the record; it just stops surfacing)")

    print("""
  One permissioned store. Every AI tool reads it through one interface.
  Employees leave, vendors change, the memory survives. That is Heirloom.
""")


if __name__ == "__main__":
    main()
