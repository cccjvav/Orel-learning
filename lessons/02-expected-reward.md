# Lesson 02 — Expected reward: what does “good on average” mean?

[Lesson index](README.md) · [Previous lesson](01-learning-by-making-decisions.md)

**Status:** learner correctly explained that an expectation need not be an individual outcome; bandit terminology clarified next.

**Course connection:** `Online Learning Setup and Stochastic Bandits.pdf`, PDF pp. 3–4 and 8, uses underlying mean losses and expectations. This lesson supplies the probability prerequisite using rewards first. The café examples are original teaching examples, not copied exercises. Later we will translate to the course's loss notation and carefully distinguish regret from pseudo-regret.

## 1. From observed averages to an underlying model

We already computed an average from collected ratings. Now ask: if we knew the probability of every possible rating, could we calculate the café's underlying average?

Consider a simplified café B with just two possible ratings:

| Rating (reward) | Probability |
| --- | --- |
| 10 | 25%, or 0.25 |
| 6 | 75%, or 0.75 |

A probability describes how likely an outcome is. Here the two possibilities cover all outcomes, so their probabilities add to 100%, or 1. We assume these probabilities are given for this example; an actual bandit learner does not know them in advance.

25% does not promise exactly one rating of 10 in every four visits. Random outcomes can cluster. In an independent-visits model, the next visit has the same probabilities regardless of previous ratings.

## 2. Expected reward is a probability-weighted average

“Expected” has a technical meaning here: it is not a promise about the next coffee, nor necessarily the most likely rating.

To calculate it, multiply each possible reward by its probability, then add:

**Expected reward = (10 × 0.25) + (6 × 0.75) = 2.5 + 4.5 = 7.**

Why not (10 + 6) / 2 = 8? That would give the two outcomes equal weight. But a 6 is three times as likely as a 10. It must count more heavily.

A helpful imagined batch is 100 visits with exactly 25 ratings of 10 and 75 ratings of 6. Their total would be 250 + 450 = 700, for an average of 7. This illustrates the weighting; the actual counts in 100 random visits are not guaranteed.

The café never gives a rating of 7 in this model, yet its expected reward is 7. An average does not have to be a possible individual outcome.

## 3. Three concepts that must stay separate

| Concept | Meaning in this example |
| --- | --- |
| Next observed reward | Either 10 or 6; we do not know which in advance |
| Sample average | The average of the rewards actually collected; may be above or below 7 |
| Expected reward / true mean | Exactly 7 under the specified probability model |

In an actual learning problem, the probabilities and true mean are usually unknown. Observed rewards let us estimate the mean. Calculating 7 from known model probabilities and estimating a mean from data are different tasks.

## 4. Mean quality is not consistency

Suppose café A always gives a rating of 7, while B follows the table above.

- A's expected reward is 7.
- B's expected reward is also 7.
- A is perfectly consistent in this simplified example; B varies.

If our sole objective is to maximize expected total reward, these two options have equal mean reward. A personal preference for avoiding disappointing coffee would require expressing that preference in the objective or reward definition. A higher or more certain mean is not automatically a guarantee of less variable outcomes.

## 5. Guided training

Café C gives a rating of 9 with probability 50% and a rating of 5 with probability 50%.

**Try:** What is its expected reward?

**Hint:** Multiply each rating by 0.5, then add the two contributions.

**Worked solution:** (9 × 0.5) + (5 × 0.5) = 4.5 + 2.5 = 7. Because the outcomes are equally likely, an ordinary average of the two ratings happens to work here.

**Conversation checkpoint:** Can B's expected reward be 7 even though no individual coffee receives a 7? Explain in words if possible. The learner correctly explained that this is an average and need not equal an individual outcome.

## Next

After checking this distinction, introduce a random reward symbol and the expectation symbol one at a time. Then connect expected rewards to comparing options and to regret, distinguishing the best true mean from the best observed fixed action in hindsight. Do not conflate those benchmarks.


## Follow-up: what is a bandit problem?

The learner asked for clarification of “bandit problem.” Do not assume a term is understood merely because earlier notes introduced it.

A **multi-armed bandit problem** is a repeated decision problem: choose one of several options, observe the reward of that option, and use that information to improve later choices. The usual goal is to obtain a high total reward over the rounds, not merely to identify the best option without regard to the cost of learning.

The name comes from slot machines, nicknamed “one-armed bandits”: the arm is the lever, and “bandit” refers to taking players' money. In the mathematical problem, an **arm** means an option, not a literal arm. Gambling is just the historical analogy; cafés, advertisements, and other applications can have the same structure.

Café mapping:

- Arms: cafés A and B.
- One round: one visit/choice.
- Reward: the chosen coffee's rating.
- Bandit feedback: you observe the rating at the café you visited, not the coffee you would have received at the other café that day.
- Unknown information: how good each option is on average.
- Goal: obtain good total ratings while learning enough to choose well.

For the basic **stochastic** bandit model, each option has an unknown, fixed reward distribution (a probability rule for its possible rewards), with independent draws across rounds in the standard model. Other bandit settings relax these assumptions; “bandit” alone does not guarantee stable reward probabilities.

The café table with known probabilities was an explanatory model for expectation. A bandit learner normally does not receive that table; it sees outcomes such as 6, 10, 6 and estimates quality from them.

The defining feedback limitation is not knowing what the unchosen option would have produced. Full-information feedback would reveal every option's outcome after each choice, although not necessarily before choosing.

No additional checkpoint was required here: clarify the requested term before introducing more notation.

## First notation: writing an expectation

We now introduce two symbols, using reward notation for teaching (the course's bandit slides often use losses instead).

- `R` names a random reward: the rating of one coffee before its outcome is known. It is a random variable, a numerical quantity whose value depends on a random outcome.
- `E[R]`, written mathematically as **𝔼[R]**, means the expected value of R: its probability-weighted average. The brackets identify which quantity we are averaging; they are not multiplication.

For the model with reward 10 with probability 0.25 and reward 6 with probability 0.75:

**𝔼[R] = 0.25 × 10 + 0.75 × 6 = 7.**

This says exactly what our earlier calculation said. Symbols provide a compact way to name the quantity and operation; they do not add a new assumption.

One observed reward could be 10, while the model expectation remains 7. A new observation can change our estimate of an unknown mean, but does not by itself change the underlying probability model.

Guided checkpoint: another café gives reward 8 with probability 0.5 and reward 4 with probability 0.5. Start with **𝔼[R] = 0.5 × 8 + 0.5 × 4**. Ask the learner to finish the arithmetic. No response has been recorded yet. The worked result is 4 + 2 = 6; retain this as a reference, not a claim of demonstrated calculation skill.
