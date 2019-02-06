import axios from "axios";

export default {
    
    getArticles: function (searchTerm) {
        return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=" + searchTerm + "&api-key=w7YFO40sgkhkqrR08lROQoFx7MCGyDX8"
            // + searchTerm + "&facet=true&begin_date="
            // + startYear + "0101&end_date=" + endYear + "1231&"
            // + "api-key=w7YFO40sgkhkqrR08lROQoFx7MCGyDX8"
        );
    },

    saveArticle: function(articleData) {
        return axios.post("/api/articles", articleData)
    },

    deleteArticle: function(id) {
        return axios.delete("/api/articles/" + id)
    }

}

