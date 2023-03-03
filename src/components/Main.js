import { useEffect, useState } from "react"
import CatNav from "./CatNav"
import NewsCard from "./NewsCard"

export default function Main(){
    //2a99cc6057254a88a105bb86a55aa6b8
    const [news, setNews] = useState ([])
    const [filter, setFilter] = useState("All")
    const [resultat, setResultat] = useState([])
    const navCat = [...new Set(news.map((e)=> e.source.name))]


    const getNews = async() => {
        const response = await fetch('https://newsapi.org/v2/everything?q=nintendo&pageSize=20&apiKey=2a99cc6057254a88a105bb86a55aa6b8')
        const data = await response.json()
        setNews(data.articles)
        setResultat(news.filter((items => items.source.name === filter)))
    }

    console.log(resultat)

    useEffect(() =>{
        getNews()
    }, [filter] )

    const handleFilter = (event)=>{
        console.log(event.target.innerHTML)
        setFilter(event.target.innerHTML)
    }

    const handleReset =()=>{
        setFilter("All")
    }

    return (
        <>
            <h2>Her kommer nyheter</h2>
            <CatNav navCat={navCat} handleFilter={handleFilter} handleReset={handleReset}/>
            {resultat.length <= 0 ? news?.map((item, index) =>(
                <NewsCard key={index} img={item.urlToImage} title={item.title} ingress={item.description}/>
            )) : resultat?.map((item, index) =>(
                <NewsCard key={index} img={item.urlToImage} title={item.title} ingress={item.description}/>
            )) }
        </>
    
    )
}