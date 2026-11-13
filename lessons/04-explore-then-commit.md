# Lesson 04 — A complete strategy: explore, then commit

[Lesson index](README.md) · [Previous lesson](03-regret.md)

**Source:** `Online Learning Setup and Stochastic Bandits.pdf`, PDF pp. 13–16 (explore-then-commit). This is an original numerical teaching example with an explicit loss table.

## Why go back to a strategy

You now have the vocabulary to judge a sequence of decisions: loss, total loss, the best fixed action in hindsight, regret, and the notation for these. The next natural question is: **what procedure would actually make choices?**

We look at the simplest complete strategy. It has two phases.

## Explore-then-commit (ETC)

Choose a number of exploration pulls per action, call it **m**.

1. **Explore:** choose every action exactly m times. Do not update the choice based on what you see during this phase.
2. **Estimate:** for each action, average the losses you observed for it.
3. **Commit:** identify the action with the smallest average loss. Choose that action for every remaining round.

The word **commit** means no further exploration; the strategy stops gathering new information and uses what it has.

## Worked example

Let T = 10 rounds, two cafés A and B, and m = 2. So rounds 1–4 are exploration: A twice, then B twice.

| Round | Chosen | Loss | Phase |
| ---: | --- | ---: | --- |
| 1 | A | 0.3 | explore |
| 2 | A | 0.5 | explore |
| 3 | B | 0.6 | explore |
| 4 | B | 0.1 | explore |
| 5 | ? | 0.3 if B | commit |
| 6 | ? | 0.2 if B | commit |
| 7 | ? | 0.4 if B | commit |
| 8 | ? | 0.2 if B | commit |
| 9 | ? | 0.1 if B | commit |
| 10 | ? | 0.3 if B | commit |

### Step 1: estimate each action

The loss table below gives every action's loss on every round, as an evaluator would know it. The learner only observes the chosen row entry.

| Round | A's loss | B's loss |
| ---: | ---: | ---: |
| 1 | 0.3 | 0.2 |
| 2 | 0.5 | 0.4 |
| 3 | 0.1 | 0.6 |
| 4 | 0.2 | 0.1 |
| 5 | 0.4 | 0.3 |
| 6 | 0.3 | 0.2 |
| 7 | 0.2 | 0.4 |
| 8 | 0.1 | 0.2 |
| 9 | 0.3 | 0.1 |
| 10 | 0.2 | 0.3 |

The learner's exploration observations are:

- A: losses 0.3 and 0.5 -> average 0.8 / 2 = **0.4**
- B: losses 0.6 and 0.1 -> average 0.7 / 2 = **0.35**

### Step 2: commit

B has the smaller observed average (0.35 < 0.4), so commit to B for rounds 5–10.

### Step 3: collect the committed losses

B's losses on rounds 5–10 are 0.3, 0.2, 0.4, 0.2, 0.1, 0.3. Their sum is **1.5**.

Total loss of the strategy:

- Exploration: 0.3 + 0.5 + 0.6 + 0.1 = 1.5
- Commitment: 1.5
- Overall: **3.0**

## Was committing to B correct?

Using the complete table, evaluate the fixed choices:

- Always A: total **2.6**
- Always B: total **2.8**

So the best fixed action was A, not B. ETC committed to the wrong café because a sample average from only two observations is noisy.

Realized regret is therefore 3.0 − 2.6 = **0.4**. Compare this at most with the same table's fixed benchmark; do not compare it with a different table's totals.

This is a central lesson about exploration:

> **A sample average is an estimate, not the truth. Too little exploration can lead to a confidently wrong commitment.**

## The trade-off in the choice of m

- **Small m:** more rounds spent on the apparently best action, but the estimates are unreliable, so the commitment is more likely to be wrong.
- **Large m:** better estimates and a smaller chance of a wrong commitment, but more rounds deliberately spent on actions that may be worse.

Choosing m is therefore a real design decision, not a detail. Later parts of the course analyze how to balance these costs.

## What assumption makes this sensible?

ETC's averaging assumes a **stochastic bandit**: each action's loss in each round comes from a fixed distribution for that action, and observations are independent draws. Under that assumption, repeated observations tell us about an action's typical loss, and averages improve with more samples.

If losses could be chosen adversarially after seeing our behavior, past averages would not necessarily predict future losses. The same algorithm would lose its justification. Distinguishing stochastic from adversarial settings matters, not just terminology.

## Supported checkpoint

Using the table above, suppose we decide to commit to B. Add B's six losses in rounds 5–10.

1. What is the committed-phase total?
2. What is the whole strategy's total loss?
3. Best fixed total is 2.6. What is the regret?

Reference answers: 1.5; 3.0; 0.4. No learner response yet. The conceptual point to check separately is why a wrong commitment can happen even though the procedure followed its own rule correctly.
