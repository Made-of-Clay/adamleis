# Portfolio Ideas

// Return to website refactor using this session maybe: `opencode -s ses_0bd1e0eb1ffeGjrA6JKGKs8Be3`

## Elemental

Note: need to work out a better title later.

### First Pass

A sphere that moves around a floating island space controlled by the user. The sphere will become an avatar with expressions eventually (ideally?) but can begin as a simple shape for interaction mechanics.

Get the floating island, the sphere avatar, and the environment in place first. That's the base goal. Ensure lighting and environment effects work well.

### Future Ideas

Brain dump want-to-have ideas here. The biggest blocker will be trying to do too much at once, so layer up the effects and features. (That's why the first pass only focuses on the simplest interactions and environment/lighting/texture details.)

#### Other Islands

Add other islands with some variation and maybe small sin/cos floating pattern. This can enable flight and island traversal. Or use portals to teleport between islands. That could be a fun shader practice.

#### Elemental Shrines

Other nearby islands may have elemental shrines where the sphere avatar can be imbued with different elemental effects (more shader play). Fire, earth, air, water are the first obvious effects, and borrowing from *LoK: Defiance*, light and dark. All fun shader learning opportunities.

#### Project Display

I want to show off other projects possibly (it's a portfolio project), so I need to decide out to do that within the world. More portals for previewing things would be cool. Possibly a screen effect to facilitate breaking the 3d interaction into 2d.

### Technical Challenges

- How do I load resources efficiently so each new thing is only added to runtime memory when necessary AND stops when irrelevant for the scene?
