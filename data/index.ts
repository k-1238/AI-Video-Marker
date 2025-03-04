export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

import B1 from '../public/b1.svg'
import B4 from '../public/b4.svg'
import B5 from '../public/b5.svg'
import Grid from '../public/grid.svg'
import Portfolio from '../public/portfolio.png'
import Neopass from '../public/neopass.png'
import Oten from '../public/o-ten.png'
import cloud from '../public/cloud.svg'
import cloudName from '../public/cloudName.svg'
import dockerName from '../public/dockerName.svg'
import dock from '../public/dock.svg'
import streamName from '../public/streamName.svg'
import s from '../public/s.svg'
import hostName from '../public/hostName.svg'
import host from '../public/host.svg'
import appName from '../public/appName.svg'
import app from '../public/app.svg'
import git from '../public/git.svg'
import twit from '../public/twit.svg'
import link from '../public/link.svg'
import exp1 from '../public/exp1.svg'
import exp2 from '../public/exp2.svg'

export const gridItems = [
  {
    id: 1,
    title: "Create TikTok and YouTube videos in all categories, with full customization thanks to our advanced AI video generation settings. ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-center items-center",
    img: B1,
    spareImg: "",
  },
  {
    id: 2,
    title: "Maximize Your Revenue",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "Create unique videos in just a few clicks",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Videos generated with the power of Vexub",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: Grid,
    spareImg: B4,
  },

  {
    id: 5,
    title: "Because actions speak louder than words. Here are some concrete examples..",
    description: "Why trust us?",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: B5,
    spareImg: Grid,
  },
  {
    id: 6,
    title: "The future of video creation with Vexub",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "My Portfolio",
    des: "This is my portfolio. You can check my experience with this. If you like it, hire me.",
    img: Portfolio,
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "https://portfolio-ten-jade-33.vercel.app/",
  },
  {
    id: 2,
    title: "NeoPass",
    des: "NeoPass is a unified account system designed to transform user interaction with Neopets.",
    img: Neopass,
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
    link: "https://neopass.neopets.com",
  },
  {
    id: 3,
    title: "O-Ten",
    des: "This website is about shoes. The customers can search the shoes what you want in this website.",
    img: Oten,
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
    link: "https://o-ten-delta.vercel.app/",
  },
];

// export const testimonials = [
//     {
//         quote:
//             "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
//         name: "Michael Johnson",
//         title: "Director of AlphaStream Technologies",
//     },
//     {
//         quote:
//             "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
//         name: "Michael Johnson",
//         title: "Director of AlphaStream Technologies",
//     },
//     {
//         quote:
//             "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
//         name: "Michael Johnson",
//         title: "Director of AlphaStream Technologies",
//     },
//     {
//         quote:
//             "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
//         name: "Michael Johnson",
//         title: "Director of AlphaStream Technologies",
//     },
//     {
//         quote:
//             "Collaborating with Adrian was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Adrian's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Adrian is the ideal partner.",
//         name: "Michael Johnson",
//         title: "Director of AlphaStream Technologies",
//     },
// ];

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: cloud,
    nameImg: cloudName,
  },
  {
    id: 2,
    name: "appwrite",
    img: app,
    nameImg: appName,
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: host,
    nameImg: hostName,
  },
  {
    id: 4,
    name: "stream",
    img: s,
    nameImg: streamName,
  },
  {
    id: 5,
    name: "docker.",
    img: dock,
    nameImg: dockerName,
  },
];

export const workExperience = [
  {
    id: 1,
    title: "NeoPass",
    desc: "NeoPass is a unified account system designed to transform user interaction with Neopets. It enhances the gaming experience, strengthens security, and fosters community engagement. Key features include user management, enhanced security protocols, and community features to create a connected Neopia.",
    className: "md:col-span-2",
    thumbnail: exp1,
  },
  {
    id: 2,
    title: "GAM (LMS Website)",
    desc: "The LMS website project aims to create an online platform for a university. It facilitates course management, communication tools, content delivery, assessments, and progress tracking. The platform supports instructors in course creation and management, and students in browsing, enrolling, and interacting with courses.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: exp2,
  },
  {
    id: 3,
    title: "Caprelo (Relocation Website)",
    desc: "This website supports relocation needs for living, working, and thriving across a lifetime. It assists HR teams and employees in smooth transitions by offering relocation services, user management, and service selection options.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: exp2,
  },
  {
    id: 4,
    title: "Agrimor (Agrimor Website)",
    desc: "Agrimor Website manages plant data such as nutrient levels, height, and health status. It provides users with plant locations, analytics, and ownership information. The platform features a userfriendly interface for uploading images and data, as well as map integration for detailed field analysis.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: exp1,
  },
];

export const socialMedia = [
  {
    id: 1,
    img: git,
    link: "#",
  },
  {
    id: 2,
    img: twit,
    link: "#",
  },
  {
    id: 3,
    img: link,
    link: "#",
  },
];
