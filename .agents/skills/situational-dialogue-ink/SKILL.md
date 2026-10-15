---
name: situational-dialogue-ink
description: "Interactive branching situational dialogues, JFT-Basic roleplay simulations, and conversational state machines using InkJS."
---

# Situational Dialogue & Roleplay Skill (InkJS)

This skill provides the structure for interactive, branching Japanese conversations (e.g. at a convenience store, asking for directions, hotel check-in, doctor visit) powered by the open-source **Ink** narrative scripting engine via `inkjs`.

## 1. Ink Scenario Scripting Format (`.ink`)

```ink
=== konbini_start ===
店員: いらっしゃいませ！お弁当温めますか？
+ [はい、お願いします。 (Polite)]
    ~ politeness_score += 10
    店員: かしこまりました。少々お待ちください。
    -> ask_chopsticks
+ [温めなくていいです。 (Direct)]
    ~ politeness_score += 5
    店員: はい、そのままでお渡ししますね。
    -> ask_chopsticks
+ [うん、温めて。 (Casual - Too blunt for clerk!)]
    ~ politeness_score -= 10
    店員: （少し驚いた顔で）あ、はい…温めますね。
    -> ask_chopsticks

=== ask_chopsticks ===
店員: お箸はお付けしますか？
+ [一膳お願いします。]
    -> checkout_finish
+ [結構です、持っています。]
    -> checkout_finish

=== checkout_finish ===
店員: ありがとうございました！またお越しくださいませ。
-> END
```

## 2. Running Ink Scenarios in React / Web
```ts
import { Story } from 'inkjs';

export function runDialogueStory(storyJson: any) {
  const story = new Story(storyJson);

  function getNextTurn() {
    const textLines: string[] = [];
    while (story.canContinue) {
      textLines.push(story.Continue() || '');
    }

    const currentChoices = story.currentChoices.map((choice) => ({
      index: choice.index,
      text: choice.text,
    }));

    return {
      text: textLines.join('\n'),
      choices: currentChoices,
      isEnded: !story.canContinue && currentChoices.length === 0,
    };
  }

  function chooseOption(choiceIndex: number) {
    story.ChooseChoiceIndex(choiceIndex);
    return getNextTurn();
  }

  return { getNextTurn, chooseOption, story };
}
```
