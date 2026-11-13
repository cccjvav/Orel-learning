# Lesson 03 — Regret: comparing our decisions with a benchmark

[Lesson index](README.md) · [Previous lesson](02-expected-reward.md)

**Source:** `Online Learning Setup and Stochastic Bandits.pdf`, PDF p. 5, defines regret relative to the best fixed action in hindsight. This is an original numerical teaching example. No probability calculations are needed yet.

## Why total loss alone is not enough

A loss total tells us what happened to us, but not whether another available choice would have done better. Regret compares our total with a specified benchmark.

For this lesson, the benchmark is **the best fixed action in hindsight**:

- Fixed: choose the same café on every round.
- Best: among these fixed choices, take the one with the smallest total loss.
- In hindsight: identify it after seeing all rounds' outcomes. This does not give the learner advance knowledge.

## Worked example

| Round | A's loss | B's loss | Our choice | Our loss |
| --- | ---: | ---: | --- | ---: |
| 1 | 0.2 | 0.4 | A | 0.2 |
| 2 | 0.6 | 0.3 | A | 0.6 |
| 3 | 0.1 | 0.2 | B | 0.2 |

1. Our total loss is 0.2 + 0.6 + 0.2 = **1.0**.
2. Always choosing A gives 0.2 + 0.6 + 0.1 = **0.9**.
3. Always choosing B gives 0.4 + 0.3 + 0.2 = **0.9**.
4. Both fixed choices tie for best, with total loss **0.9**.
5. Regret = our total loss − best fixed total loss = **1.0 − 0.9 = 0.1**.

Interpretation: we suffered 0.1 more total loss than the best fixed choice on these three rounds. Regret is not our total loss and is not a count of mistakes.

The complete table is available for this teaching calculation. Under bandit feedback the learner sees only the chosen loss each round; exact regret need not be directly computable from its observations.

## Do not change the benchmark mid-calculation

Choosing the best café separately on each round would mean A, B, A and total loss 0.2 + 0.3 + 0.1 = **0.6**. That is a switching benchmark, not the fixed-action benchmark used here. Subtracting 0.6 would answer a different question.

This example uses realized losses. It is distinct from the earlier illustration comparing a randomized strategy's expected reward with the best true mean. The course distinguishes regret, expected regret, and pseudo-regret; those distinctions will be taught later.

## Supported checkpoint

Keep the same table, but suppose our choices are A, B, B. Our total loss is 0.2 + 0.3 + 0.2 = **0.7**. The best fixed action's loss stays **0.9**, since the table has not changed. What is the regret?

Reference solution: 0.7 − 0.9 = **−0.2**. Realized regret against the best fixed action can be negative: switching allowed us to outperform both fixed choices on this particular table. A negative result does not invalidate the formula. No learner answer yet; explain this interpretation after their calculation.

## Progress

Introduced after the learner correctly converted reward 0.8 into loss 0.2 and explained why it is preferable to 0.3. Understanding of the regret calculation and benchmark is not yet checked.
