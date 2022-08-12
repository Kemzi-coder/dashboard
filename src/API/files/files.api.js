import $api from "../../axios";

class FilesAPI {
	static uploadAvatar(file) {
		const formData = new FormData();
		formData.append("avatar_url", file);
		return $api.post("service/change_avatar", formData);
	}
}

export default FilesAPI;
