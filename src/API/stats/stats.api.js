import $api from "../../axios";

class StatsAPI {
	static fetchAll() {
		return $api.get("account/get_statistics");
	}
}

export default StatsAPI;
