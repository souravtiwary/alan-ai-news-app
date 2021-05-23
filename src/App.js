import React, { useState, useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import { Typography } from '@material-ui/core';
import NewsCards from './component/NewsCards/NewsCards'
import wordsToNumbers from 'words-to-number'
import useStyles from "./style.js"
import AlanImage from './alanai.jpg'

const alankey = 'f11681b28f92e96b38a746cd90ba31492e956eca572e1d8b807a3e2338fdd0dc/stage'
//const newsAPI = 'ad36ab564ae74cd986ff14f043f15d18'
const App = () => {

    const [activeArticle, setActiveArticle] = useState(0);
    const [newsArticles, setNewsArticles] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: 'f11681b28f92e96b38a746cd90ba31492e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);

    return(
        <div>
            <div >
                {newsArticles.length ? (
                    <div className={classes.infoContainer}>
                        <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
                        <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
                    </div>
                ) : null}
                <img src={AlanImage} className={classes.alanLogo} alt="alan logo"/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}

export default App;