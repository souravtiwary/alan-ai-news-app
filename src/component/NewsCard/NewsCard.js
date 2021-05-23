import React, {useState, useEffect, createRef} from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Button, Typography, CardActions} from '@material-ui/core'
import useStyles from './style'

function NewsCard({ article: { description, publishedAt, source, title, url, urlToImage }, activeArticle, i }) {
    const classes = useStyles() 
    const defaultImage = 'http://static.everypixel.com/ep-pixabay/0741/1093/6899/08857/7411093689908857422-news.jpg';
    const [eleRefs, setEleRefs] = useState([])
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop-50)

    useEffect(() => {
        window.scroll(0,0)
        setEleRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()))
    }, [])

    useEffect(()=>{
        if( i === activeArticle && eleRefs[activeArticle]){
            scrollToRef(eleRefs[activeArticle])
        }
    }, [i, activeArticle, eleRefs])

    return (
        <Card ref={eleRefs[i]} className={ activeArticle === i ? classes.activeCard : classes.card}>
            <CardActionArea href={url} target="_blank">
                <CardMedia className={classes.media} image={urlToImage || defaultImage}/>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
                </div>
                <Typography className={classes.titles} gutterBottom variant="h5">{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary">Learn More</Button>
                <Typography variant="h5" color="textSecondary">{i+1}</Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCard
