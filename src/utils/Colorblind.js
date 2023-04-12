import colorblind from "color-blind";

class Colorblind {
  static protanomaly(color) {
    return {
      type: "Protanopia",
      desc: "Low Red",
      color: colorblind.protanomaly(color),
    };
  }

  static deuteranomaly(color) {
    return {
      type: "Deuteranomaly",
      desc: "Low Green",
      color: colorblind.deuteranomaly(color),
    };
  }

  static tritanomaly(color) {
    return {
      type: "Tritanomaly",
      desc: "Low Blue",
      color: colorblind.tritanomaly(color),
    };
  }

  static protanopia(color) {
    return {
      type: "Protanopia",
      desc: "No Red",
      color: colorblind.protanopia(color),
    };
  }

  static deuteranopia(color) {
    return {
      type: "Deuteranopia",
      desc: "No Green",
      color: colorblind.deuteranopia(color),
    };
  }

  static tritanopia(color) {
    return {
      type: "Tritanopia",
      desc: "No Blue",
      color: colorblind.tritanopia(color),
    };
  }

  static achromatomaly(color) {
    return {
      type: "Achromatomaly",
      desc: "Almost No Color",
      color: colorblind.achromatomaly(color),
    };
  }

  static achromatopsia(color) {
    return {
      type: "Achromatopsia",
      desc: "No Color",
      color: colorblind.achromatopsia(color),
    };
  }
}

export default Colorblind;
