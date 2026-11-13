# Teaching handover — OReL self-study

Last updated: 2026-09-18. Read this before continuing instruction.

## Mission and learner preferences

The user wants a patient lecturer/teacher throughout the actual course materials, not a summary generator, a new app, or assignment-heavy tutoring. Assume little prior familiarity with terminology. Use simple language without sacrificing accuracy. Explain the reason for each step, demonstrate worked examples, then offer short supported practice. Introduce mathematics gradually. The user learns by seeing how to do things.

Keep chat lessons manageable: one conceptual advance at a time, usually one low-pressure checkpoint. Give specific feedback on their reasoning; refine imprecise claims kindly. Do not interpret agreement such as “yes” as demonstrated mastery.

The user explicitly requires permanent lesson documentation and regular Git pushes. Save useful chat explanations and learning observations, not only summaries. Push at meaningful checkpoints. The user requested this handover so a future assistant can continue without restarting.

## Repository and sources

- Repository: `cccjvav/Orel-learning`.
- This session's fixed working branch: `arena/01a0b3fa-orel-learning`. Do not switch branches or push another branch.
- Materials were found on `origin/main` after fetching. They are now copied into `OReL Material/OReL Material/`. Do not ask the user to upload them again.
- The duplicate ZIP was intentionally not copied. The PDFs match their source blobs.
- `coues_material.html` is the supplied schedule. The introduction PDF has a tentative schedule differing in places. Use the roadmap as a self-study sequence, not a claim about exact lecture chronology.
- Source references use 1-based PDF page numbers; printed slide numbers differ because of overlays.
- Earlier branch `arena/01a0b1ce-orel-learning`, reviewed at `6b76729b54c6d409232b680b7af8e9c6b43a0d36`, contains a static demo learning app about programming variables. Useful teaching principles were reused, but its subject, fictional progress, and learner details must NOT be mistaken for this user's course or progress. No need to build/import the app.

## Files to read

1. `lessons/README.md`: lesson index and current position.
2. `lessons/TEACHING-GUIDE.md`: teaching/documentation conventions.
3. `lessons/COURSE-MAP.md`: planned topic coverage and source inventory.
4. `lessons/01-learning-by-making-decisions.md`: first lesson plus actual follow-up discussion.
5. `lessons/02-expected-reward.md`: next short lesson and continuation point.

Keep this file and the index current as teaching advances. Distinguish written material, material introduced in chat, and understanding actually demonstrated.

## What the learner has demonstrated

Through their own answers, the learner has recognized:

- Always returning to the first good café may prevent discovering a better option.
- Repeated visits help investigate variation and estimate average quality.
- Adding a rating of 10 to an existing average of 7 raises the average, because 10 exceeds 7.
- Mostly choosing the currently promising café while sometimes trying another balances benefiting now with discovery.

Their wording about finding the “true average” was refined: finite observations estimate it, rather than generally identify it exactly. Their description of quality becoming “more constant” was refined: more data improves knowledge of the mean, not necessarily the consistency of individual coffees. These refinements were explained, but not independently checked.

## Examples already used

- B's ratings: 4, 8, 7, 9, 7. Sum 35, sample average 7.
- Add a rating of 10: sum 45 over six visits, average 7.5.
- Do NOT average 7 and 10 equally: the old average represents five visits.
- Incremental update: old average + (new rating − old average) / new count.
- A averaging 7 over 100 visits versus B averaging 6 over two visits: better estimate versus uncertainty. Assumptions about comparable variation and stable independent sampling matter.
- Epsilon-greedy introduced as a supplementary intuitive example: 90% select current best estimated café; 10% choose uniformly between both cafés. While A's estimate is higher, B is selected 5% of the time, not 10%. Exploration can select A; probabilities are not exact schedules. Exploitation switches to B if its estimate becomes higher. No mastery of this calculation was tested.

## Current teaching point and immediate next step

The user said “Yes, you can continue now” and requested this handover. Lesson 02 introduces expected reward using a known toy model:

- B gives reward 10 with probability 0.25 and reward 6 with probability 0.75.
- Expected reward = 10 × 0.25 + 6 × 0.75 = 7.
- This is a probability-weighted average, not a promised next outcome.
- B never produces a 7 in that model; an expected value need not be an attainable individual outcome.
- Real bandit learners do not know the underlying probabilities; they estimate means from observations.

The learner correctly answered that expectation is an average and need not equal an individual outcome. They then asked what “bandit problem” means. We clarified the name, arms/options, repeated choices, chosen-action-only feedback, and total-reward objective using the café example (saved in Lesson 02). Next, ensure this terminology is comfortable before introducing symbols and loss notation. Their conceptual expectation answer is demonstrated; independent probability calculations have not been checked.

## Topics NOT yet demonstrated

Regret, MDPs, policies, and planning appear in the written first lesson, but have not been substantively checked in chat. Probability/expected reward is only now being introduced. No confidence bounds, UCB/LCB proof, adversarial algorithms, or RL algorithms have been taught. Do not jump to them as if prerequisites are mastered.

Avoid conflating sample average with true mean, variability with uncertainty, or realized regret relative to the best fixed action in hindsight with pseudo-regret relative to the best true mean. Fixed-rate epsilon-greedy is illustrative, not an optimal method or the exact method presented in the course's bandit slides.

## Source coverage and practical caveats

Introductory PDFs read closely: `Course Introduction - OReL2026.pdf`, `Online Machine Learning.pdf`, and introductory material in `Online Learning Setup and Stochastic Bandits.pdf`. Remaining PDFs are inventoried, not all read or verified.

PDF text was extracted with `pypdf` in a local virtual environment; `.cache/` and `.venv/` are ignored and may need recreation. Check equations against the PDFs if extracted text is garbled.

The course introduction (PDF p. 18) prohibits LLM use for submitted home assignments. We are providing self-study teaching and original training examples, not submission-ready course homework.

The user enabled Google Docs, but has not requested moving lessons there. No Google Docs document has been created. Repository Markdown is the established documentation location.

## Git continuity

Use `git status`, fetch the session branch, and inspect local/remote history before committing. In this environment, later turns have sometimes shown the initial local commit despite retaining files from earlier pushed work. Do not force-push or discard content to repair that. Compare files/history and preserve both existing work and remote commits before integrating. A rejected push is not a successful push.

Previous remote checkpoint before this handover: `e633d3b`, containing the epsilon-greedy discussion. This handover and Lesson 02 are intended to be committed and pushed together; use Git history to verify the resulting commit rather than relying on a stale hash in this document.


### Latest continuation checkpoint

After the bandit explanation, the user replied “ok.” We proceeded to introduce `R` as a random reward and `𝔼[R]` as its expected value, using the existing 10/6 probability example. Agreement is not evidence of mastery of bandits or notation. The next question asks the learner to calculate **0.5 × 8 + 0.5 × 4** for a new café; no answer has been received. Respond to that calculation next, then proceed gradually toward loss notation and regret. Do not restart the earlier expectation checkpoint.

### Latest learner answer and next teaching point

The learner correctly answered **6** for the supported calculation `0.5 × 8 + 0.5 × 4`. That checkpoint is complete. We now illustrate averaging over choices: given true means A = 7 and B = 6, a direct 90% A / 10% B rule earns expected reward 6.9 per visit, an expected shortfall of 0.1 compared with always A. Explicitly distinguish this rule from the earlier epsilon-greedy example (95% A / 5% B). The next conceptual question asks why a learner might still sometimes try B when its mean is not known in advance. Do not assume the new calculation or the distinction between regret benchmarks has been mastered.

### Latest checkpoint: exploration motivation confirmed; loss notation next

The learner correctly answered that we explore B because we do not yet know enough about it. The next explanation bridges rewards to the course's losses: divide 0–10 coffee ratings by 10, then set loss = 1 − normalized reward. Examples: rating 7 gives reward 0.7 and loss 0.3; rating 2 gives loss 0.8. Pending question: rating 8 gives reward 0.8—what is the loss, and is it preferable to the loss from rating 7? Answer not yet received. Next, once this direction is comfortable, introduce a small loss-based regret example with a best-fixed-action benchmark. Do not restart previous completed checkpoints.

### Latest continuation: Lesson 03, regret

The learner correctly answered the reward-to-loss checkpoint: 1 − 0.8 = 0.2, better than 0.3 because lower is preferable. Introduced Lesson 03 (`lessons/03-regret.md`) with a three-round realized-loss table. A losses = [0.2, 0.6, 0.1]; B losses = [0.4, 0.3, 0.2]. Both fixed choices total 0.9. Our choices A,A,B total 1.0, giving regret 0.1. Explain “fixed” and “in hindsight,” and that the full table is for evaluation, not bandit feedback available to the learner.

Pending checkpoint: change our choices to A,B,B, total loss 0.7. Ask for 0.7 − 0.9. Correct result is −0.2; use it to explain that realized regret against a fixed comparator can be negative because a switching learner can beat both fixed choices. No answer received yet. Do not confuse this with nonnegative stochastic pseudo-regret.

### Latest answer: negative regret calculated correctly

The learner correctly answered **−0.2** for the regret checkpoint. The follow-up explains that our switching sequence A,B,B incurs 0.2 less loss than the best fixed café. This does not mean our sequence is the best possible: A,B,A totals 0.6 instead of 0.7. Explain the signs of regret and preserve the fixed comparator. Next pending question: would always choosing A produce negative regret in this same table? Expected answer: no, total 0.9 minus best-fixed total 0.9 is zero. Calculation of −0.2 is demonstrated; interpretation is introduced but not yet checked.

### Latest continuation: average regret

The learner correctly answered **zero** for always-A's 0.9 total minus the 0.9 benchmark. Next introduced total versus average regret, tied to the sublinear-regret goal on PDF p. 5 of the bandit setup slides. Illustrative totals: 10 over 100 rounds -> 0.10 per round; 20 over 1,000 -> 0.02. Increasing total regret can coexist with decreasing average gap. These are illustrations, not measured results or proof of an asymptotic guarantee. Pending supported calculation: total regret 30 over 1,000 rounds; what is 30 / 1,000? Correct result 0.03, not yet answered. Introduce formal sublinear notation only gradually, and avoid claiming realized regret must be nonnegative or monotone.

### Latest continuation: concrete sublinear growth

The learner correctly calculated **0.03** for 30 / 1,000. We now contrast illustrative total-regret growth √T versus 0.1T, using T = 100, 10,000, 1,000,000. Square-root totals 10, 100, 1,000 yield average gaps 0.1, 0.01, 0.001; linear totals keep average gap at 0.1. These are illustrative growth patterns, not measured café results or a proven bound for an algorithm. Explain the square root and T before relying on symbols. R_T in this section means regret; earlier R meant reward, so explicitly distinguish them. Pending conceptual question: which pattern makes average regret approach zero, and why? The arithmetic is demonstrated; the sublinear-growth interpretation is not yet independently checked.

### Latest user question: define the comparator's average loss

The learner selected pattern B correctly but described it as “average regret grows slower.” Clarify that total regret grows slower than T, while average regret decreases toward zero in that example. They asked how the best fixed action's average loss is defined. The reply returns to the three-round table: each fixed café totals 0.9, hence benchmark average = 0.9/3 = 0.3. Our A,A,B average = 1/3, giving average regret 0.1/3 ≈ 0.0333. Explain all-round versus selected-round averages, no switching, and hindsight. Also explicitly state that the illustrative √T curve alone gives the gap, not enough information to compute the benchmark's numerical average. Definition saved in Lesson 03. User understanding of this clarification not yet checked; prioritize answering follow-up questions over advancing notation.

### Latest conceptual clarification: regret need not be observable

User asked how regret can be calculated without an observed benchmark and whether more decisions change its average. Explain: exact realized regret is generally unidentifiable from chosen-action-only feedback; theoretical evaluation need not be an algorithm input. Use two worlds with observed A losses [0.4,0.4], unobserved B either [0.1,0.1] (regret 0.6) or [0.9,0.9] (regret 0). Distinguish complete-table evaluation, estimates, and theoretical bounds. Then extend original café table by A=0.9/B=0.1 on round 4: benchmark average changes from 0.3 to 0.25, with B winning at T=4. Our A,A,B,B total is 1.1, so regret 0.1 and average regret 0.025. Both averages must be recomputed at the same horizon. The √T example was illustrative, not a calculation from learner feedback. These questions show active engagement with observability and the comparator; clarification not yet checked. Pause for questions rather than advancing to another algorithm immediately.
