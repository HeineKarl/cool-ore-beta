import UserService from "@/utils/UserService";

const { updateUserVision } = UserService;
export const visionTest = {
  namespaced: true,
  state: {
    answer: null,
    answer1: null,
    answer2: null,
    correctAnswers: [],
    normal: [],
    protan: [],
    deutan: [],
    imageIndex: 0,
    end: false,
    vision_type: null,
    result: {
      vision: null,
      desc: null,
    },
    ishihara_red_green: [
      {
        id: 1,
        img: require("@/assets/red_green_ishihara/ishihara_1.png"),
        answer: 12,
        wrong: null,
      },
      {
        id: 2,
        img: require("@/assets/red_green_ishihara/ishihara_2.png"),
        answer: 8,
        wrong: 3,
      },
      {
        id: 3,
        img: require("@/assets/red_green_ishihara/ishihara_3.png"),
        answer: 6,
        wrong: 5,
      },
      {
        id: 4,
        img: require("@/assets/red_green_ishihara/ishihara_4.png"),
        answer: 29,
        wrong: 70,
      },
      {
        id: 5,
        img: require("@/assets/red_green_ishihara/ishihara_5.png"),
        answer: 57,
        wrong: 35,
      },
      {
        id: 6,
        img: require("@/assets/red_green_ishihara/ishihara_6.png"),
        answer: 5,
        wrong: 2,
      },
      {
        id: 7,
        img: require("@/assets/red_green_ishihara/ishihara_7.png"),
        answer: 3,
        wrong: 5,
      },
      {
        id: 8,
        img: require("@/assets/red_green_ishihara/ishihara_8.png"),
        answer: 15,
        wrong: 17,
      },
      {
        id: 9,
        img: require("@/assets/red_green_ishihara/ishihara_9.png"),
        answer: 74,
        wrong: 21,
      },
      {
        id: 10,
        img: require("@/assets/red_green_ishihara/ishihara_10.png"),
        answer: 2,
        wrong: null,
      },
      {
        id: 11,
        img: require("@/assets/red_green_ishihara/ishihara_11.png"),
        answer: 6,
        wrong: null,
      },
      {
        id: 12,
        img: require("@/assets/red_green_ishihara/ishihara_12.png"),
        answer: 97,
        wrong: null,
      },
      {
        id: 13,
        img: require("@/assets/red_green_ishihara/ishihara_13.png"),
        answer: 45,
        wrong: null,
      },
      {
        id: 14,
        img: require("@/assets/red_green_ishihara/ishihara_14.png"),
        answer: 5,
        wrong: null,
      },
      {
        id: 15,
        img: require("@/assets/red_green_ishihara/ishihara_15.png"),
        answer: 7,
        wrong: null,
      },
      {
        id: 16,
        img: require("@/assets/red_green_ishihara/ishihara_16.png"),
        answer: 16,
        wrong: null,
      },
      {
        id: 17,
        img: require("@/assets/red_green_ishihara/ishihara_17.png"),
        answer: 73,
        wrong: null,
      },
      {
        id: 18,
        img: require("@/assets/red_green_ishihara/ishihara_18.png"),
        answer: "Nothing",
        wrong: 5,
      },
      {
        id: 19,
        img: require("@/assets/red_green_ishihara/ishihara_19.png"),
        answer: "Nothing",
        wrong: 2,
      },
      {
        id: 20,
        img: require("@/assets/red_green_ishihara/ishihara_20.png"),
        answer: "Nothing",
        wrong: 45,
      },
      {
        id: 21,
        img: require("@/assets/red_green_ishihara/ishihara_21.png"),
        answer: "Nothing",
        wrong: 73,
      },
      {
        id: 22,
        img: require("@/assets/red_green_ishihara/ishihara_22.png"),
        answer: 26,
        answer1: 2,
        answer2: 6,
        wrong: null,
      },
      {
        id: 23,
        img: require("@/assets/red_green_ishihara/ishihara_23.png"),
        answer: 42,
        answer1: 4,
        answer2: 2,
        wrong: null,
      },
      {
        id: 24,
        img: require("@/assets/red_green_ishihara/ishihara_24.png"),
        answer: 35,
        answer1: 3,
        answer2: 5,
        wrong: null,
      },
      {
        id: 25,
        img: require("@/assets/red_green_ishihara/ishihara_25.png"),
        answer: 96,
        answer1: 9,
        answer2: 6,
        wrong: null,
      },
    ],
  },
  mutations: {
    nextIshihara(state, answer) {
      const ishihara = state.ishihara_red_green;

      if (state.correctAnswers.length > 17) {
        console.log("Normal Vision");

        state.result.vision = "Normal Vision";
        state.result.desc =
          "All three types of cone cells, which are functioning normally, are used for normal color vision. Trichromacy is another name for normal color vision. Trichromats are people with normal color vision.";
        state.vision_type = state.result.vision;
        state.end = true;
      }

      if (state.end) return;

      //   Not Part of Scoring
      if (ishihara[state.imageIndex].id >= 22) {
        // Answer 1 and 2 correct 1pt for normal
        if (
          parseInt(state.answer1) === ishihara[state.imageIndex].answer1 &&
          parseInt(state.answer2) === ishihara[state.imageIndex].answer2
        ) {
          state.normal.push(parseInt(`${state.answer1}${state.answer2}`));
        } else {
          // Only Answer 1 correct push 2pts else 1pt for guessing
          if (parseInt(state.answer1) === ishihara[state.imageIndex].answer1) {
            state.deutan.push(parseInt(state.answer1));
            state.deutan.push(parseInt(state.answer1));
          } else {
            state.deutan.push(parseInt(state.answer1));
          }

          // Only Answer 2 correct push 2pts else 1pt for guessing
          if (parseInt(state.answer2) === ishihara[state.imageIndex].answer2) {
            state.protan.push(parseInt(state.answer2));
            state.protan.push(parseInt(state.answer2));
          } else {
            state.protan.push(parseInt(state.answer2));
          }
        }

        // console.log(state.protan.length, "PROTAN");
        // console.log(state.deutan.length, "DEUTAN");
        // console.log(state.normal.length, "NORMAL");

        state.answer1 = "";
        state.answer2 = "";

        // Ishihara Finished
        if (ishihara.length - 1 == state.imageIndex) {
          if (
            state.protan.length > state.normal.length &&
            state.protan.length > state.deutan.length
          ) {
            console.log("Protan");
            state.result.vision = "Protan";
            state.vision_type = state.result.vision;
            state.result.desc =
              "Protan is a red-green color blindness that accounts for 20% of all cases of color blindness. Protan color blindness limits a person's ability to discern between more than three colors to two or three, as opposed to seven colors for someone with normal color vision.";
          } else if (
            state.deutan.length > state.normal.length &&
            state.deutan.length > state.protan.length
          ) {
            state.result.vision = "Deutan";
            state.vision_type = state.result.vision;
            state.result.desc =
              "Approximately 80% of all cases of color blindness are deutan, a red-green color blindness. In contrast to someone with normal color vision, who can differentiate 7 different color hues, a person with deutan color blindness can only see 2 or 3 different color hues.";
          } else {
            console.log("Red Green Deficient");
            state.result.vision = "Red Green Deficient / Undetermined";
            state.result.desc =
              "The most prevalent type of color blindness in humans is red-green color blindness. It occurs to those who are unable to perceive red and green hues in the same manner that those who have normal color vision do. ";
            state.vision_type = state.result.vision;
          }

          return (state.end = true);
        }

        state.imageIndex += 1;
        return console.log("Evaluation");
      }

      //   Submit Button is pushed
      if (
        ishihara[state.imageIndex].answer === parseInt(state.answer) ||
        ishihara[state.imageIndex].answer === answer
      ) {
        // If Nothing Button was pushed
        if ((state.answer == "" || state.answer == null) && answer) {
          state.correctAnswers.push(answer);
        } else {
          state.correctAnswers.push(parseInt(state.answer));
        }
      }

      state.imageIndex += 1;
      state.answer = "";
      console.log(state.correctAnswers.length);
    },
  },
  actions: {
    updateUserVision({ state }) {
      if (!state.vision_type) return;
      updateUserVision({
        id: parseInt(sessionStorage.getItem("id")),
        vision_type: state.vision_type,
      });
    },
  },
};
