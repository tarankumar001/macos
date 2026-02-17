import type { WebsitesData } from "~/types";

const websites: WebsitesData = {
  favorites: {
    title: "SNS Links",
    sites: [
      {
        id: "my-blog",
        title: "Website",
        img: "https://zxh.me/img/avatar.jpg",
        link: "https://medium.com/@ptarankumar",
        inner: true
      },
      {
        id: "my-github",
        title: "Github",
        img: "img/sites/github.svg",
        link: "https://github.com/tarankumar001"
      },
      {
        id: "my-linkedin",
        title: "Linkedin",
        img: "img/sites/linkedin.svg",
        link: "https://www.linkedin.com/in/tarankumar-p-954948257/"
      },
      {
        id: "my-twitter",
        title: "X",
        img: "img/sites/x.jpg",
        link: "https://x.com/PTarankumar"
      },
      {
        id: "my-email",
        title: "Email",
        img: "img/sites/gmail.svg",
        link: "mailto:ptarankumar@gmail.com"
      }
    ]
  },
  freq: {
    title: "Frequently Visited",
    sites: [
      {
        id: "github",
        title: "Github",
        img: "img/sites/github.svg",
        link: "https://github.com/"
      },
      {
        id: "arxiv",
        title: "Jmail",
        img: "img/sites/arxiv.png",
        link: "https://jmail.world/"
      },
      {
        id: "twitter",
        title: "X",
        img: "img/sites/x.jpg",
        link: "https://x.com/"
      },
      {
        id: "dribbble",
        title: "Dribbble",
        img: "img/sites/dribbble.svg",
        link: "https://dribbble.com/"
      },
      {
        id: "pinterest",
        title: "Pinterest",
        img: "img/sites/pinterest.svg",
        link: "https://www.pinterest.com/"
      },
      {
        id: "art-station",
        title: "ArtStation",
        img: "img/sites/artstation.svg",
        link: "https://www.artstation.com//"
      },
      {
        id: "bilibili",
        title: "Crunchyroll",
        img: "img/sites/Crunchyroll.svg",
        link: "https://www.crunchyroll.com/"
      },
      {
        id: "zhihu",
        title: "EchoHire",
        img: "img/sites/zhihu.jpeg",
        link: "https://ai-mock-interview-eight-tau.vercel.app/"
      },
      {
        id: "leetcode",
        title: "LeetCode",
        img: "img/sites/leetcode.svg",
        link: "https://leetcode.com/"
      },
      {
        id: "reddit",
        title: "Reddit",
        img: "img/sites/reddit.svg",
        link: "https://www.reddit.com/"
      },
      {
        id: "hacker-news",
        title: "Hacker News",
        img: "img/sites/hacker.svg",
        link: "https://news.ycombinator.com/"
      },
      {
        id: "steam",
        title: "Steam",
        img: "img/sites/steam.svg",
        link: "https://store.steampowered.com/"
      }
    ]
  }
};

export default websites;
