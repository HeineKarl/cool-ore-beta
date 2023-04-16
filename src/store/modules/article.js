export const article = {
  namespaced: true,
  state: {
    articles: [
      {
        id: 1,
        author: "Rovic Saguiped",
        date: "Jan 21, 2023",
        article: {
          title: "Protanopia",
          intro: {
            title: "Introduction",
            desc: "Protanopia is a form of color blindness when a person has trouble telling the difference between red and green tones. This is brought on by an X chromosome mutation that damages the cones in the eye that perceive red and green light. Red light may appear more like green or yellow to people who have protanopia because they are less sensitive to it. Because of this, it may be challenging to differentiate between some hues, especially in low light. It is more prevalent in males since they only have one X chromosome and is inherited in an X-linked recessive form.",
          },

          conflicts: [
            {
              title: "Commonality of Protanopia",
              desc: "In this types of color blindness the major problem is very hard to distinguish the color of red and green, as you can see at the example at the top picture, the color of red and green will change because of this case. Protanopia is commonly issue of color blindness so the people.",
            },
            {
              title: "Living with Protanopia",
              desc: "Most people with protan color blindness lead normal lives. However, having color blindness can make certain day-to-day tasks more difficult, like driving, cooking, and using electronics. Management techniques, such as memorization, lighting changes, and labeling systems, can be a helpful for navigating daily life when you have color blindness.",
            },
          ],
          stats: [
            {
              title: "Stats in the World",
              desc: "There is general agreement that 1 in 12 men (8%) and 1 in 200 women are colorblind (approximately 4.5% of the world population), as a result, there are more than 350 million color blind people in the world. This number increases every year according to the world's population growth (1.05%). You can compare this number to the whole US population (332 Million).",
            },
            {
              title: "Stats in the Philippines",
              desc: "7.1% of the total study population (16/224) had color deficiency with 11.9% among males and 1% among females.",
            },
          ],
          references: [
            {
              ref: "Kosari, A. (2022). Different Types of Color Blindness 2022 | A Simple Explanation. https://www.colorblindguide.com/post/different-types-of-color-blindness?fbclid=IwAR0k0a9FkCag-7jP1-gdZfqVSKDIoF-Nw67nOC47LCJlzs2XKrIqHM5aYSs",
            },
            {
              ref: "Kosari, A. (2022). Colorblind People Population! Statistics. https://www.colorblindguide.com/post/colorblind-people-population-live-counter",
            },
            {
              ref: "Lockett, E. What Is Protan Color Blindness? https://www.healthline.com/health/eye-health/protan-color-blindness",
            },
            {
              ref: "Padilla JL, Flaminiano R & Roxas AA Jr (1998). The prevalence of congenital color blindness among Filipino medical students. https://www.herdin.ph/index.php/partners?view=research&cid=33094#:~:text=7.1%25%20of%20 the%20total%20study,males%20and%201%25%20among%20females",
            },
          ],
        },
      },
      {
        id: 2,
        author: "Rovic Saguiped",
        date: "Jan 21, 2023",
        article: {
          title: "Protanomaly",
          intro: {
            title: "Introduction",
            desc: "Protanomaly is a genetic condition that affects the way the eye perceives color, specifically it is a type of color blindness where there is a reduced sensitivity to red light. People with protanomaly may have difficulty distinguishing between red and green hues, and may see red colors as appearing more green. It is caused by a genetic mutation that affects the receptors in the eye responsible for detecting red light. Protanomaly is inherited in an X-linked recessive pattern, which means that it primarily affects males, as they only have one X chromosome. It is a relatively rare condition, affecting around 1% of the male population.",
          },

          conflicts: [
            {
              title: "Difficulty distinguishing between colors",
              desc: "People with protanomaly may have difficulty distinguishing between red and green hues, which can make it difficult to navigate traffic signals, read maps, or identify different types of fruits and vegetables. To overcome this, they can use assistive devices such as color identification tools, and special glasses that help to enhance the contrast between colors.",
            },
            {
              title: "Difficulty in school or work",
              desc: "Children with protanomaly may have difficulty learning colors in school and may have difficulty with tasks that require color discrimination. Adults with protanomaly may have difficulty in certain careers such as graphic design, fashion, and art. To overcome this, they can use assistive technology such as color contrast software, and seek accommodations in their workplace.",
            },
            {
              title: "Difficulty with safety",
              desc: ": People with protanomaly may have difficulty recognizing danger signals such as fire alarms, emergency stop buttons, or warning lights. To overcome this, they can use assistive devices such as vibrating or audio alarms, or alarms with strobe lights.",
            },
            {
              title: "Difficulty in sports",
              desc: "People with protanomaly may have difficulty in sports that rely on color recognition, such as golf, fishing, or hunting. To overcome this, they can use special equipment that is designed to enhance the contrast between colors.",
            },
          ],
          stats: [
            {
              title: "Stats in the World",
              desc: "There is general agreement that 1 in 12 men (8%) and 1 in 200 women are colorblind (approximately 4.5% of the world population), as a result, there are more than 350 million colorblind people in the world.",
            },
            {
              title: "Stats in the Philippines",
              desc: "7.1% of the total study population (16/224) had color deficiency with 11.9% among males and 1% among females.",
            },
          ],
          references: [
            {
              ref: "Kosari, A. (2022). Colorblind People Population! Statistics. https://www.colorblindguide.com/post/colorblind-people-population-live-counter",
            },
            {
              ref: "Padilla JL, Flaminiano R & Roxas AA Jr (1998). The prevalence of congenital color blindness among Filipino medical students.https://www.herdin.ph/index.php/partners?view=research&cid=33094#:~:text=7.1%25%20of%20 the%20total%20study,males%20and%201%25%20among%20females",
            },
          ],
        },
      },
    ],
  },
  mutations: {},
  actions: {},
};
