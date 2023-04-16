import axios from "./Axios";
import reqUrl from "./Variables";

const url = reqUrl.users;

class UserService {
  static generateToken() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(url + "token");
        resolve(response);
      } catch (err) {
        if (err.response.status == 401 || err.response.status == 403) {
          resolve(err.response);
        }

        reject(err);
      }
    });
  }
  static getUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
      } catch (err) {
        reject(err);
      }
    });
  }

  static logoutUser(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(url + "logout", { id });
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  // Register User
  static insertUser(user_name, email, passcode) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(url + "register", {
          user_name,
          email,
          passcode,
        });

        resolve(res);
      } catch (err) {
        if (err.request.status == 409) {
          resolve(err.response);
          return;
        }

        reject(err);
      }
    });
  }

  // Update the Profile
  static updateUserProfile(userProfile) {
    const {
      id,
      user_name,
      profile_image,
      first_name,
      last_name,
      age,
      gender,
      vision_type,
      bio,
    } = userProfile;

    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.put(url + "profile", {
          id,
          user_name,
          profile_image,
          first_name,
          last_name,
          age,
          gender,
          vision_type,
          bio,
        });
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  // Update the Audio or Text To Speech
  static updateUserAudio(userAudio) {
    const { user_id, audio_accent, audio_pitch, audio_speed, audio_volume } =
      userAudio;

    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.put(url + "audio/" + user_id, {
          user_id,
          audio_accent,
          audio_pitch,
          audio_speed,
          audio_volume,
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  static getUserAudio(user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url + "audio/" + user_id);
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static getUserAppearance(user_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}appearance/${user_id}`);
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static updateUserAppearance(userAppearance) {
    const { user_id, color_theme } = userAppearance;
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.put(`${url}appearance/${user_id}`, {
          color_theme,
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  // Login User
  static verifyUser(email, passcode) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(url + "login", { email, passcode });
        const data = res.data;
        resolve(data);
      } catch (err) {
        console.log(err);
        if (err.response.status == 401) {
          resolve(err.response.data);
          return;
        }
        if (err.response.status == 404) {
          resolve(err.response.data);
        }

        reject(err);
      }
    });
  }
}

export default UserService;
