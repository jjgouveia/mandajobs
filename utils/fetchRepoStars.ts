export class fetchStars {
    private user: String;
    private repo;

    constructor(user: String, repo: String) {
        this.user = user;
        this.repo = repo;
    }

    public async getStars() {
        let urlRepository = `https://img.shields.io/github/stars/${this.user}/${this.repo}.json`;
        let request = await fetch(urlRepository);
        let response = await request.json();
        return response.value;
    }
}