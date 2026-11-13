# Course roadmap

[Back to the index](README.md)

## How to use this map

The supplied `coues_material.html` is our schedule reference. The introduction slides also contain a tentative schedule, which differs in places. Below is a teaching sequence for self-study, not a claim that the original lectures ran in this exact order. Each block can take several short lessons. We will explain prerequisite mathematics as it becomes necessary.

| Block | What we will learn | Main local source filenames |
| --- | --- | --- |
| 1. Orientation | Decisions, feedback, exploration, and long-term consequences | `Online Machine Learning.pdf`; `Course Introduction - OReL2026.pdf` |
| 2. Mathematical foundation and bandits | Notation, probability, expectation, regret, stochastic bandits, confidence bounds, UCB/LCB | `Online Learning Setup and Stochastic Bandits.pdf`; `Stochastic Bandits - the UCB algorithm.pdf`; [YS] chapter 7.1–7.3 |
| 3. MDP foundations | States, actions, transitions, policies, values, discounted rewards, Bellman equations | `MDP-general model.pdf`; `MDP-Discounted-compressed.pdf`; `Notes on Theory of Discounted MDPs.pdf` |
| 4. Adversarial online learning | Expert advice, full information, adversarial bandits | `Prediction with Expert Advice.pdf`; `Prediction with Expert Advice and Adversarial Bandits.pdf`; [YS] chapter 7.4–7.5 |
| 5. Context and evaluation | Contextual bandits, evaluation of bandit algorithms, further online settings | `Contextual Bandits.pdf`; `Online Learning Other Topics.pdf`; [YS] chapter 7.6 |
| 6. Learning from experience | Policy evaluation, off-policy evaluation, Monte Carlo, direct policy search | `OPE.pdf`; `Notes on Policy Evaluation.pdf`; `RL-MonteCarlo.pdf`; [CI] chapters 2–3 |
| 7. Improving policies | Off-policy optimization, tabular Q-learning, policy gradients | `OPO Methods and QL.pdf`; `RL-PolicyGradients.pdf`; [CI] chapter 5 |
| 8. Deep RL | Function approximation, deep Q-learning, actor-critic | `RL-DQN.pdf`; `RL-AC.pdf`; [CI] chapters 4 and 6 |
| 9. Other time objectives | Finite-horizon and average-reward MDPs | `MDP-FH.pdf`; `MDP-AverageReward.pdf`; matching theory notes |
| 10. Online RL guarantees | RL settings, performance metrics, episodic and average-reward regret | `RL Setups.pdf`; `Online Episodic RL.pdf`; `Online Average-Reward RL.pdf`; `Online Average-Reward RL-1.pdf` |

All source filenames above live in `../OReL Material/OReL Material/` relative to this folder.

## Reference shelf and coverage notes

- **[YS]**: `YS Machine Learning The Science of Selection ....pdf`.
- **[CI]**: `Deep_Reinforcement_Learning.pdf`.
- `Notation Conversion.pdf` will help translate between the instructors' different symbols.
- `RL Setups-1.pdf` is byte-identical to `RL Setups.pdf`; `RL-AC-1.pdf` is byte-identical to `RL-AC.pdf`. These are not extra topics.
- The two average-reward RL files are different; inspect both when reaching that block.
- The supplied schedule lists four project PDFs as missing. They have not been recovered here. Some reading references such as [B1], [P1], and [P2] are not fully identified by that HTML file; we will check their identity and availability before relying on them.
- The introduction's home-assignment slide (PDF p. 18) prohibits LLM use for submitted assignments. These notes are for self-study with original training examples, not submission-ready homework.

Only the introductory sources have been read closely so far. This map inventories the remaining topics; it is not a claim that every PDF has already been taught or verified.
