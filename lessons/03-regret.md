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

## Checkpoint answered: interpreting negative regret

The learner correctly calculated 0.7 − 0.9 = **−0.2**. This demonstrates the subtraction; interpretation is explained next, not yet independently checked.

Negative realized regret means our total loss was smaller than the best fixed action's total loss. Here we incurred **0.2 less loss** than either always-A or always-B. This is possible because our choices may switch between actions, whereas the comparator must stick to one action across all rounds.

The benchmark uses hindsight to pick the best fixed action, not to choose each round's winner. “Best fixed” is therefore not “best possible sequence.” Our sequence A,B,B has loss 0.7; A,B,A would have loss 0.6. Thus negative regret does not prove our sequence was globally optimal, nor that our strategy will perform well on every future sequence.

For this loss-based definition:

- Positive regret: more loss than the best fixed action.
- Zero regret: equal total loss to the best fixed action.
- Negative regret: less loss than the best fixed action.

Do not clip negative values to zero or reverse the subtraction. A negative realized regret is distinct from the stochastic pseudo-regret discussed later, whose standard definition is nonnegative.

Next conceptual checkpoint: could we get negative regret in this same table if we committed to A for all three rounds? No: always-A totals 0.9 and the best fixed action totals 0.9, giving zero. More generally a fixed action cannot beat the best fixed action on the same realized table. No learner answer yet.

## Checkpoint answered: matching the fixed benchmark

The learner correctly answered zero for always-A: 0.9 − 0.9 = 0. This demonstrates identifying equality with the benchmark in the worked table.

## Next concept: total versus average regret

Source connection: `Online Learning Setup and Stochastic Bandits.pdf`, PDF p. 5, introduces the goal of sublinear regret.

Total regret may increase while average regret per round decreases. Average regret per round = total regret / number of rounds. It compares average loss with the best fixed action's average loss over the same horizon, not with the winner of each individual round.

Illustrative performance figures (not measured results from the café table): after 100 rounds, total regret 10 gives average regret 0.10; after 1,000 rounds, total regret 20 gives average regret 0.02. The total increased, but the average shortfall decreased. Two such checkpoints alone do not establish an asymptotic guarantee.

A **sublinear regret** guarantee means regret grows slower than the number of rounds, so its ratio to the number of rounds tends to zero as the horizon grows. In an introductory nonnegative growth example, total regret equal to the square root of the round count has this property. A constant positive gap of 0.1 per round instead gives linear total regret 0.1 times the round count, with average regret remaining 0.1. Precise later guarantees may concern expected regret or upper bounds; do not assume realized regret is nonnegative or monotone.

Sublinear regret is about the average gap to a benchmark vanishing. It does not mean zero total loss, perfect choices on every round, or a guarantee that every later single choice is better.

Guided checkpoint: if total regret is 30 after 1,000 rounds, average regret is 30 / 1,000 = 0.03. Ask the learner to compute this; answer not yet received.

## Checkpoint answered: average regret 0.03

The learner correctly calculated 30 / 1,000 = 0.03. This demonstrates the supported average-regret calculation.

### Reading sublinear growth through a concrete example

As an illustrative nonnegative regret curve, suppose total regret after T decisions is the square root of T. T is the number of decisions, not a reward. The square root of a number is the nonnegative number which, multiplied by itself, gives the original number.

| T (decisions) | Illustrative total regret √T | Average regret √T / T |
| --- | --- | --- |
| 100 | 10 | 0.1 |
| 10,000 | 100 | 0.01 |
| 1,000,000 | 1,000 | 0.001 |

Multiplying the number of decisions by 100 multiplies this total regret by only 10, so the average regret shrinks by a factor of 10. In contrast, total regret 0.1T gives constant average regret 0.1. Neither formula is claimed as an exact result for our café strategy. Actual theorems may upper-bound expected regret instead of describing every realized run.

A first notation bridge: R_T denotes cumulative regret after T decisions. Then R_T / T denotes average regret. Earlier Lesson 02 used R for a random reward; here R_T names regret, a different quantity. Symbols are local conventions and must be read with their definitions. This R_T notation matches the bandit slides (PDF p. 5).

The purpose of this growth comparison is to understand why a growing cumulative number need not indicate failure. We care about its growth relative to the horizon.

Pending conceptual checkpoint: which example has a vanishing average gap, total regret 0.1T or total regret √T, and why? Expected answer: √T, because dividing by T makes the average shrink toward zero; 0.1T leaves the constant 0.1. No learner answer yet. Do not claim this property has been independently explained by the learner.

## Clarification: the best fixed action's average loss

The learner correctly selected pattern B as sublinear, but said “average regret grows slower.” Refine this: **total regret grows more slowly than T; average regret decreases toward zero** in the square-root example.

The learner asked how the best fixed action's average loss is defined. For each available action, add its realized losses across the same T rounds and divide by T. Take the smallest such average. Equivalently, find the smallest cumulative loss first and divide by T; all actions have the same denominator.

Original three-round table: A losses 0.2, 0.6, 0.1; B losses 0.4, 0.3, 0.2. Each fixed action has cumulative loss 0.9, so the best fixed action's average loss is 0.9 / 3 = 0.3. Our A,A,B choices have cumulative loss 1.0 and average loss 1/3. Thus average regret = 1/3 − 0.3 = 0.1/3, approximately 0.0333. This is the same as total regret divided by three.

Crucial distinctions:

- Average each action across **all T rounds**, not just rounds on which we selected it. Averaging only selected observations estimates its quality, but does not define this realized fixed-action benchmark.
- Do not take the minimum loss separately each round: that allows switching and changes the comparator.
- Do not substitute the smallest true expected loss: that is a different benchmark used in stochastic pseudo-regret, to be taught later.
- The benchmark is chosen in hindsight. Under bandit feedback we generally lack the unchosen outcomes, so exact realized regret need not be observable to the learner. A complete loss table is an analytical description, not assumed learner feedback.
- At each horizon T, recompute over the first T rounds. Which action is best may change with T. “Fixed” means the comparator uses one action throughout a given comparison, not that the same action must win at every horizon.

The earlier √T and 0.1T examples specify only the regret gap, not a complete loss table. They do not determine the best fixed action's average loss numerically. One needs the losses or additional information to calculate that average.

Compact definition for later reference: best-fixed average loss = min over actions a of [(loss of a on round 1 + ... + loss of a on round T) / T]. Average regret = our average loss − best-fixed average loss.

## Learner question: unobserved regret and a changing benchmark

The learner correctly challenged two points: without the complete benchmark, how can we calculate regret, and won't more rounds change the benchmark's average? These are substantive conceptual questions, not arithmetic errors.

Answer: from bandit observations alone, we generally cannot calculate exact realized regret. It is an evaluation quantity defined using all actions' realized losses, even unobserved ones. Two complete loss tables can agree on everything the learner observed yet give different regret. Example: choose A on both rounds and observe losses [0.4, 0.4], total 0.8. If B's unobserved losses are [0.1, 0.1], best-fixed total is 0.2 and regret is 0.6. If B's losses are [0.9, 0.9], best-fixed total is A's 0.8 and regret is 0. These worlds are indistinguishable from the learner's feedback.

An algorithm does not need exact regret as an input. It selects actions from observed feedback. Researchers may (a) evaluate against a complete table in an appropriate simulation, (b) prove an expected-regret or high-probability bound under specified assumptions without observing the actual regret, or (c) estimate performance with suitable statistical methods and assumptions. An estimate or bound is not an exact observed regret. Knowing true means alone permits expected-mean comparisons, not reconstruction of all realized unchosen losses.

Yes, the benchmark is recomputed at every horizon. Extend the original table with round 4: A loss 0.9, B loss 0.1. At T=3, both fixed totals are 0.9 and best-fixed average is 0.3. At T=4, A totals 1.8 (average 0.45), B totals 1.0 (average 0.25). B is now the best fixed action and the benchmark average is 0.25. “Always B” in this comparison includes B on rounds 1–4; it does not mean selecting a different benchmark action each round.

If our choices extend from A,A,B to A,A,B,B, our loss total changes from 1.0 to 1.1. At T=4 our average is 1.1/4 = 0.275. Regret is 1.1 − 1.0 = 0.1, and average regret is 0.1/4 = 0.025 = 0.275 − 0.25. Both averages changed; they are compared over the same horizon.

The prior √T illustration was a hypothetical regret curve, not something inferred from partial feedback. Real sublinear-regret results derive bounds under assumptions and already allow the best-in-hindsight action and its average to change with the horizon. They do not assume the realized benchmark average is constant. Stable stochastic means are distinct from finite-sample realized averages, which fluctuate.

## Reading the course's regret formula

Source connection: `Online Learning Setup and Stochastic Bandits.pdf`, PDF pp. 3–5. After the observability clarification, the learner asked to continue. We now translate the familiar table into the slide notation, rather than introducing another algorithm.

- T: total number of rounds being evaluated.
- t: a particular round, such as 1 or 2.
- a: an available action, such as café A or café B.
- A_t: the action the learner actually selects on round t. This capital A is a mathematical name for a choice; it does not necessarily mean café A.
- ℓ_{t,a}: the loss of action a on round t. The symbol ℓ is a lowercase script-like L, used for loss. The indices identify a table entry; they are not multiplication.
- ℓ_{t,A_t}: the loss of the action actually selected on round t.

For the first three rows of our table, ℓ_{2,A} = 0.6 and ℓ_{2,B} = 0.3. If the learner chooses B on round 2, A_2 = B and ℓ_{2,A_2} = 0.3.

The formula is:

R_T = Σ_{t=1}^T ℓ_{t,A_t} − min_a Σ_{t=1}^T ℓ_{t,a}.

Read it as: add our chosen losses, then subtract the smallest total obtained by holding one action fixed across all rounds. Σ means “add these terms”; min means “take the smallest.”

For choices A,A,B in the first three rounds: the first sum is 0.2 + 0.6 + 0.2 = 1.0. The fixed-A sum is 0.2 + 0.6 + 0.1 = 0.9. The fixed-B sum is 0.4 + 0.3 + 0.2 = 0.9. Thus R_3 = 1.0 − min(0.9, 0.9) = 0.1.

Order matters. min_a Σ_t ℓ_{t,a} first totals each fixed action and then selects the smallest total. Σ_t min_a ℓ_{t,a} instead selects the smallest loss on each round and then adds; that is the switching benchmark. Here the latter is 0.2 + 0.3 + 0.1 = 0.6, not 0.9.

The formula is a definition, not a claim that the bandit learner observes every term. Unchosen loss entries remain unavailable in standard bandit feedback.

Guided notation checkpoint: on round 3 we choose café B. What are A_3 and ℓ_{3,A_3}? Reference answer: B and 0.2. No learner response yet. Keep this low-pressure; the goal is translating symbols, not memorizing a formula.
