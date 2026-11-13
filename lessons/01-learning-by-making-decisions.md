# Lesson 01 — Learning by making decisions

[Lesson index](README.md) · [Course roadmap](COURSE-MAP.md)

**Starting point:** no prior knowledge of machine learning required. We will use only simple addition and averages.

**Sources:** *Online Machine Learning.pdf*, PDF pp. 2–20; *Online Learning Setup and Stochastic Bandits.pdf*, pp. 3–5 for the regret preview. Page numbers count from 1 in the PDF viewer, not printed slide numbers. The café, numerical tables, and robot examples below are original teaching examples.

## 1. The question behind the course

Imagine you have moved to a new neighbourhood. There are two cafés, A and B. Each morning you choose one. You want good coffee, but you do not yet know which café is better.

There are two jobs here:

1. **Learn:** discover which café tends to make better coffee.
2. **Decide:** choose where to buy today's coffee before you have finished learning.

Those jobs interfere with each other. Trying an unfamiliar café teaches you something, but today's coffee might be disappointing. Returning to your favourite gives you a promising coffee, but teaches you nothing about the other café.

**The central idea of this course is learning to make good decisions while information is incomplete.** Later, we also consider decisions that change what situations you face next.

By the end of this lesson, aim to explain:

- what “online” means here;
- why seeing only the result of your own choice creates a learning problem;
- exploration versus exploitation;
- why long-term decisions require more than choosing the largest immediate reward.

## 2. A few words before we need them

| Term | Plain meaning | In our café example |
| --- | --- | --- |
| Learner or agent | The decision maker that uses experience | You |
| Action | An available choice | Choose A or B |
| Round | One decision-and-feedback step | One morning |
| Reward | A number representing a desirable outcome; larger is better | Your coffee rating |
| Loss | A number representing a cost or undesirable outcome; smaller is better | How disappointing the coffee was |
| Feedback | The information received after acting | The rating of the coffee you actually tasted |
| Algorithm | A specified procedure for making decisions or calculations | A rule for selecting a café from previous ratings |

Reward is a score chosen for the task. It need not be money. A delivery robot's reward could depend on successful deliveries, delays, and energy use.

Reward and feedback are related, but not identical: feedback may include information about actions you did not choose, not just your own reward.

## 3. “Online” does not mean “on the internet”

*Source connection: Online Machine Learning, pp. 2–7.*

A simplified **batch-learning** workflow is:

> Collect a dataset → learn a rule from it → use the rule.

A dataset is simply a collection of recorded observations. For instance, a spam filter might first learn from thousands of emails already labelled “spam” or “not spam.”

An **online-learning** workflow repeats:

> Choose → receive feedback → use that feedback → choose again.

The important difference is that decisions and learning are interleaved. You cannot wait until you know everything before acting.

A robot can learn online without any internet connection. Also, “online” does not necessarily mean the environment changes: you can learn one decision at a time even when the underlying conditions are stable.

The slides introduce **i.i.d.**, short for *independent and identically distributed*. Roughly, observations follow the same probability rule, and one observation does not determine another. This does not mean all observations are equal: repeated rolls of a fair die follow the same rule but give different numbers. We will study the precise meaning when we need probability.

## 4. What are you allowed to see?

*Source connection: Online Machine Learning, pp. 9–11.*

Suppose you choose café A and rate the coffee 7 out of 10.

You know what happened at A. But what would you have received at B that morning? You did not taste it, so you do not know.

That is **bandit feedback**: you observe the outcome of the action you selected, not all the alternatives. “Bandit” comes from the slot-machine analogy; an individual option is often called an **arm**.

With **full-information feedback**, you would also learn the outcomes of the other available actions after choosing. Imagine a reliable report gives you both cafés' outcomes each morning.

Notice the timing: full information does **not** mean knowing all outcomes before choosing. You still have to act first. It means seeing more feedback afterwards.

## 5. Exploration and exploitation, worked through

*Source connection: Online Machine Learning, pp. 10–11.*

Suppose your observations are:

| Café | Ratings you have observed | Observed average |
| --- | --- | --- |
| A | 7, 8, 6 | (7 + 8 + 6) / 3 = 7 |
| B | 9 | 9 / 1 = 9 |

Why divide by three for A? We have three ratings. Their sum is 21, and an average spreads that total equally over the observations: 21 / 3 = 7.

Based on observed averages, B looks better. But we have tried it only once. That 9 could be a typical result or an unusually good day. **An observed average is evidence, not certainty about the true average.**

- **Exploitation** means using current knowledge to choose what looks best for reward now.
- **Exploration** means making choices to gain useful information, potentially sacrificing immediate reward.

Trying an untested café C would clearly be exploration. Choosing B because its current average is highest would be exploitation, though it also gives another observation. These are motivations for choices, not a claim that exploiting teaches you nothing.

Why not always explore? You might spend all your time testing disappointing options instead of benefiting from what you learned.

Why not always exploit? An early lucky result can make one option look better than it really is, while a genuinely good alternative remains underexplored.

**The exploration–exploitation trade-off is deciding how much immediate performance to exchange for information that could improve later decisions.** We have not yet specified an optimal algorithm; that depends on assumptions we will introduce later.

### One modelling caution

Real coffee preferences, prices, and service may change. A simple stochastic bandit model assumes each café has a stable reward distribution: a stable probability rule for its possible scores. The analogy helps us understand that model, but does not prove real cafés obey it.

## 6. A first look at regret

*Source connection: Online Machine Learning, p. 14; Online Learning Setup and Stochastic Bandits, pp. 3–5.*

“How much reward did I receive?” is useful, but it ignores how good the available alternatives were. A reward of 5 might be excellent if every alternative gave 1, and poor if every alternative gave 10.

**Regret compares our total performance with a specified alternative.** For this example, the alternative is the best single café to have chosen on every round, selected after seeing all outcomes. This is the *best fixed action in hindsight*.

Here is a tiny artificial example. Scores are rewards, so higher is better:

| Round | A's reward | B's reward | Our choice | Our reward |
| --- | ---: | ---: | --- | ---: |
| 1 | 3 | 1 | A | 3 |
| 2 | 0 | 2 | A | 0 |
| 3 | 1 | 2 | B | 2 |

Step by step:

1. Our total reward is **3 + 0 + 2 = 5**.
2. Always choosing A would give **3 + 0 + 1 = 4**.
3. Always choosing B would give **1 + 2 + 2 = 5**.
4. The best fixed action is B, with total 5.
5. Reward-based regret is **best fixed total − our total = 5 − 5 = 0**.

Zero regret here does not mean every choice was the best choice on that particular day. Switching perfectly between each day's winner would give 3 + 2 + 2 = 7. But that is a different, more demanding comparison than the best *fixed* action.

The table shows all rewards so we can do the calculation. Under bandit feedback, the learner would only observe the selected entry in each row; the evaluator's table is not information the learner automatically gets.

The course often uses **losses** instead of rewards. Since smaller losses are better, the subtraction reverses:

> Loss-based regret = our total loss − the best fixed action's total loss.

Do not memorize a subtraction without first asking whether bigger or smaller is better. Our 0–3 reward scores are for arithmetic practice; the bandit slides use losses bounded between 0 and 1.

## 7. What reinforcement learning adds: consequences

*Source connection: Online Machine Learning, pp. 15–20.*

In the simple café bandit model, choosing A today does not change the physical situation in which you choose tomorrow. It changes your information about the options.

Now consider a delivery robot with a low battery. It can:

- make one more delivery for a reward now; or
- recharge, receiving no delivery reward immediately.

Recharging may allow several deliveries later. Making a delivery now may leave the robot stranded.

Here, actions affect both **what we learn** and **the future situation itself**.

A **state** describes the current situation relevant to the decision, such as the robot's location and battery level. A **transition** is the move to the next state. A **policy** is a rule for choosing an action given the situation; the rule may be random rather than always choosing the same action.

The sequence looks like this:

> Current state → action → reward and next state → another action …

A **Markov decision process (MDP)** is a mathematical model of this kind of problem. The central Markov assumption is that, given the current state and action, earlier history does not provide extra information about the next-state and reward distribution. We will unpack that carefully in the MDP lessons.

**Planning** means accounting for future consequences when choosing now. Even if you knew exactly how the robot behaved, you would still need to plan. When the relevant behaviour is unknown, you must learn as well.

This is the course's useful first contrast: bandit learning introduces uncertainty and exploration; general reinforcement learning also brings action-dependent future states and long-term consequences. These fields overlap—bandits can be viewed as a special case—not two completely separate worlds.

## 8. Try it together — no grades

### A. Identify the feedback

You choose one of three advertisements to show a visitor. You observe whether they click that advertisement, but not whether they would have clicked either alternative. Is this full-information or bandit feedback?

**Hint:** Count how many actions' outcomes you observe, not how many actions are available.

**Walkthrough:** You observe only the chosen advertisement's outcome. Therefore this is **bandit feedback**. A click can be recorded as reward 1 and no click as reward 0.

### B. Make one small change to the regret example

Using the earlier table, suppose we choose A on all three rounds. What is our reward-based regret?

**Starting step:** Our total would be 3 + 0 + 1. The best fixed café is still B.

**Walkthrough:** Our total is 4. B's total is 5. Regret is 5 − 4 = **1**. That means we earned one reward unit less than the benchmark.

### C. Look beyond the immediate reward

A robot receives no immediate delivery reward for charging. Does that make charging a bad action?

**Hint:** What does charging make possible afterwards?

**Walkthrough:** Not necessarily. Charging may enable enough future deliveries to outweigh the immediate missed delivery. We need the future consequences and the objective, not just the immediate reward, to judge the action.

## 9. Keep these five ideas

1. Online learning interleaves decisions and learning; it does not require internet access.
2. Bandit feedback reveals the chosen action's outcome, not every alternative's outcome.
3. Exploration gathers information; exploitation uses current information for reward.
4. Regret measures performance relative to a defined benchmark, not a feeling of disappointment.
5. Reinforcement learning can require learning and planning because actions affect future states.

**A short check for our conversation:** If you always return to the first café that gives you good coffee, what might you fail to discover? No formula is needed—one sentence is enough.

## Next lesson

We will turn “choose, observe, improve” into the symbols used in the slides, explain each symbol, and practise regret calculations. Probability and expected values will be introduced before we rely on them.

## Follow-up notes

### Discussion: why visit an option more than once?

The learner identified that always returning to the first good café could prevent discovering a better café. Refinement: the first café might already be best; the problem is insufficient evidence, not necessarily a bad choice.

The learner then identified two benefits of repeated visits to café B: learning about variation and learning its average quality. This correctly connects exploration to gathering evidence.

Important precision: a finite number of visits lets us **estimate** the true average, not generally know it exactly. Repeated observations may reveal large variation, but do not guarantee that variation is large.

Original teaching example: B's ratings on five visits are 4, 8, 7, 9, 7. Their sum is 35, so the observed average is 35 / 5 = 7. The first rating of 4 did not represent the average of these five visits. However, 7 is still an estimate of B's underlying average—not proof that the underlying average equals 7.

- **Sample/observed average:** the average of the ratings actually collected.
- **True mean (expected reward):** the average specified by the underlying probability distribution. In a stable, independent repeated-sampling model, averages tend towards this value as the number of observations grows.
- More observations generally make estimates more reliable under those assumptions, but each extra observation need not move the estimate closer to the true mean.

If A's observed average is 7 across 100 visits and B's is 7 across five visits, the estimates are equal but not necessarily equally reliable. With comparable variability and the same stable sampling assumptions, A's larger sample gives a more precise estimate. This does not prove A is better.

### Discussion: updating an average

The learner correctly predicted that a new rating of 10 raises the current average of 7, because the new observation is above that average.

With five previous ratings totalling 35, adding 10 gives a total of 45 across six visits. The new sample average is 45 / 6 = 7.5. It is not (7 + 10) / 2 = 8.5: the old average represents five observations, whereas 10 represents only one.

An equivalent update is: new average = old average + (new observation − old average) / new observation count. Here: 7 + (10 − 7) / 6 = 7.5. The difference 10 − 7 = 3 is the new observation's deviation from our previous estimate; dividing by six gives its contribution to the update.

The same new rating changes an average less when more observations already support it. After 100 visits averaging 7, a rating of 10 gives 7 + 3 / 101, approximately 7.03. This is a sample-average update, not a universal prescription for all learning algorithms. If the underlying quality changes, giving more weight to recent observations can be useful.

A higher sample average does not establish that the café's true mean increased; the observation may simply reflect random variation.

Progress: the learner has expressed the motivation for exploration and repeated sampling, and correctly reasoned about the direction of an average update. Other lesson concepts have not yet been checked.

### Discussion: choosing while still learning

With A averaging 7 across 100 visits and B averaging 6 across two visits, the learner proposed mostly choosing A while occasionally trying B: benefit from the currently promising option without abandoning discovery. This correctly expresses the exploration–exploitation trade-off.

Precision: more observations can make our estimate of A's mean more reliable, but they do not make individual coffees more consistent. A's ratings might still vary widely. Uncertainty about an average and variability of individual outcomes are different concepts.

The remaining number of decisions matters: exploring on a final visit has no information benefit for future visits, whereas exploring early in a year-long stay may improve many later decisions. This explains a motivation for exploration, not a proof of the optimal choice for a particular problem.

An original illustration of an epsilon-greedy rule:

1. Keep an observed average for each café, after initially sampling both.
2. With probability 90%, choose the café with the highest current observed average (exploit).
3. With probability 10%, choose uniformly at random between both cafés (explore).
4. Observe the rating, update that café's average, and repeat.

“Epsilon” names the exploration probability: here epsilon = 0.10. These probabilities apply independently to the random choice mechanism each round; they do not guarantee exactly one exploration in every ten rounds. While A has the higher estimated average, B is selected with probability 0.10 × 0.50 = 0.05, or 5%. Exploration can select A too. If B's estimate becomes higher, the exploitation choice changes to B.

This is a supplementary teaching example, not yet the course's confidence-bound algorithm or a claim of optimality. A fixed exploration probability keeps spending some choices on inferior options even after substantial evidence accumulates; later lessons will explain more adaptive approaches.

Progress update: the learner can motivate combining exploration and exploitation. The distinction between outcome variability and uncertainty about the mean has been introduced, not yet checked.
