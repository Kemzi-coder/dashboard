import $api from "../../axios";

class StatsAPI {
	static loadAll() {
		return $api.get("account/get_statistics");
	}
}

export default StatsAPI;
