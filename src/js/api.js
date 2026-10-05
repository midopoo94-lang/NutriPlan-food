export class ApiFetch {
    constructor(urlBase) {
        this.urlBase = urlBase;
    }
    async fetch(endpoint) {
        try {
            const response = await fetch(`${this.urlBase}${endpoint}`,{method: 'Get' } );
            const data = await response.json();
            // console.log(data);
            return data
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async analyze(mealName,ingredience){
        try {
            const response = await fetch(`${this.urlBase}/nutrition/analyze`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                    'x-api-key':'c7UUb4FHtXlo4qLz0ZkurHl0I3YME9SgcIO0fyvC'
                },
                body: JSON.stringify({
                    recipeName: mealName,
                    ingredients: ingredience
                })
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error("Error analyzing ", error);
            return null;
        }

    }
}