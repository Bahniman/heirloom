"""Role-based access to organizational memory.

Two mechanisms, deliberately simple:
  - tier: a memory is readable by anyone at or above a rank
  - explicit allow-list: overrides tier for named roles

The correctness of this layer is the entire product. A memory store that
leaks the CFO's reasoning to the intern's agent is worse than no memory."""

ROLES = {"intern": 0, "analyst": 1, "manager": 2, "exec": 3}


def can_read(role: str, memory) -> bool:
    if role not in ROLES:
        return False
    if memory.allow_roles:
        return role in memory.allow_roles
    # unknown/missing min_role fails closed: exec-only
    return ROLES[role] >= ROLES.get(memory.min_role, ROLES["exec"])
