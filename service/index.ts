import { config } from 'dotenv';
import Snoowrap from 'snoowrap';
import { CommentStream } from 'snoostorm';
import fs from 'fs';
import { Comprehend } from 'aws-sdk';
import { fetchStockTickers } from './fetchStockTickers';
const { error, parsed } = config();
if(error || !parsed) {
    throw new Error('FAILED TO PARSE .env FILE');
}
const { CLIENT_SECRET, CLIENT_ID, REDDIT_USER, REDDIT_PASS } = parsed;

// TODO: put in DB instead of in a file
const file = '../ui/src/resultsWithSentiment.json'

fetchStockTickers().then((stockTickerMap) => {
    const comprehend = new Comprehend({ region: 'us-west-2' });

    const client = new Snoowrap({
        userAgent: 'reddit-bot-example-node',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        username: REDDIT_USER,
        password: REDDIT_PASS
    });
    const comments = new CommentStream(client, {
        subreddit: "wallstreetbets",
        limit: 10,
        pollTime: 2000,
    });

    comments.on('item', async comment => {
      const commentBody = comment.body;
      const sentiment = (await comprehend.detectSentiment({ Text: commentBody, LanguageCode: 'en' }).promise()).Sentiment;
      commentBody.split(' ').map(word => {
          const formattedWord = word.toLowerCase();
          if(!MOST_COMMON_WORDS.includes(formattedWord)) {
              const cleanedWord = word.replace('$', '')
            if(stockTickerMap[cleanedWord]) {
                console.log('FOUND TICKER', stockTickerMap[cleanedWord]);
                console.log('TICKER HAS SENTIMENT', sentiment);
                const resultsFile = JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
                if(resultsFile[cleanedWord]) {
                    if(sentiment) {
                        let newSentiment = 1;
                        if(resultsFile[cleanedWord][sentiment]) {
                            newSentiment = resultsFile[cleanedWord][sentiment] + 1;
                        }
                        resultsFile[cleanedWord] = {
                            ...resultsFile[cleanedWord],
                            timesMentioned: resultsFile[cleanedWord].timesMentioned + 1,
                            [sentiment]: newSentiment
                        }
                    } else {
                        resultsFile[cleanedWord] = {
                            timesMentioned: resultsFile[cleanedWord].timesMentioned + 1,
                        }
                    }
                } else {
                    if(sentiment) {
                        resultsFile[cleanedWord] = {
                            timesMentioned: 1,
                            [sentiment]: 1
                        }
                    } else {
                        resultsFile[cleanedWord] = {
                            timesMentioned: 1,
                        }
                    }
                }
                fs.writeFileSync(file, JSON.stringify(resultsFile, null, 4), { encoding: 'utf-8'});
            }
          }
      })
  })
})




const MOST_COMMON_WORDS = ['the','be','to','are','of','ha', 'and','a','in','that','have','i','it','for','not','on','with','he','as','you','do','at','this','but','his','by','from','they','we','say','her','she','or','an','will','my' 	,'one' 	,'all' 	,'would','there','their','what' ,'so' 	,'up' 	,'out' 	,'if' 	,'about','who' 	,'get' 	,'which','go' 	,'me' 	,'when' ,'make' ,'can' 	,'like' ,'time' ,'no' 	,'just' ,'him' 	,'know' ,'take' ,'people' ,	'into' 	,'year' 	,'your' 	,'good' 	,'some' 	,'could' ,	'them' 	,'see' 	,'other','than' ,'then' ,'now' 	,'look' ,'only' ,'come' ,'its' 	,'over' ,'think','also' ,'back' ,'after','use' 	,'two' 	,'how' 	,'our' 	,'work' ,'first','well' ,'way' 	,'even' ,'new' 	,'want' ,'because','any','these','give','day','most','us'];