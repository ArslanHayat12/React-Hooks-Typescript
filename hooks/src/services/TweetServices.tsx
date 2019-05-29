import { useState, useEffect } from "react";
import { TweetsType } from "../types/types";
import axios from "axios";
export interface Tweets {
  hits: TweetsType[];
}
export type TweetsKeyword = Pick<TweetsType, "title">;
const TweetService = () => {
  const [data, setData] = useState<Tweets>({ hits: [] });

  useEffect(() => {
    axios
      .get("http://hn.algolia.com/api/v1/search?query=redux")
      .then(result => {
        setData(result.data);
      })
      .catch(err => {
        console.log("Error", err);
      });
  }, [data]);
  return data;
};
const TweetSearchService = (title: string, allHits: any) => {
  const [data, setData] = useState<Tweets>({ hits: [] });

  useEffect(() => {
    // axios
    //   .get("http://hn.algolia.com/api/v1/search?query=redux")
    //   .then(result => {
    //     setData(result.data);
    //   })
    //   .catch(err => {
    //     console.log("Error", err);
    //   });
    const newData = title
      ? allHits.filter((person: any) => person.title.toLowerCase().includes(title.toLowerCase()))
      : allHits;
    setData({ hits: newData });
  }, [data,allHits,title]);
  return data;
};
export { TweetService, TweetSearchService };
