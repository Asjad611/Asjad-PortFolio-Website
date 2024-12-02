import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaChevronDown } from "react-icons/fa6";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GrInstagram } from "react-icons/gr";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TbBrandGmail } from "react-icons/tb";

import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
emailjs.init(""); // Replace 'YOUR_USER_ID' with the one from the EmailJS dashboard

import "./App.css";

function App() {
  const circle1 = useRef();
  const circle2 = useRef();
  const box = useRef();
  const container = useRef();
  const movingcontainer = useRef();
  const tiles = useRef([]);
  const [anim, setanim] = useState(true);
  const [maxDis, setmaxDis] = useState(null);
  const [index, setindex] = useState(0);
  const secondPage = useRef();
  const thirpage = useRef();
  const gnoti = useRef();
  const rnoti = useRef();
  const form = useRef();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const movContainer = useRef();
  const conCont = useRef();
  
  const sendEmail = (e) => {
    e.preventDefault(); // Prevent form submission

    emailjs
      .send(
        "service_l2kt51o", // Replace with your EmailJS Service ID
        "template_uuqa38x", // Replace with your EmailJS Template ID
        {
          from_name: name,
          email: email,
          message: message,
        },
        "Gc-iYCZLSHWi5VScC"
      )
      .then(
        (result) => {
          let tl = gsap.timeline();
          tl.to(gnoti.current, {
            y: "200%",
            duration: 0.5,
            ease: "power4.inOut",
          });
          tl.to(gnoti.current, {
            y: "=100%",
            delay: 1.5,
            duration: 0.5,
            ease: "power4.inOut",
          });
        },
        (error) => {
          let tl = gsap.timeline();
          tl.to(rnoti.current, {
            y: "200%",
            duration: 0.5,
            ease: "power4.inOut",
          });
          tl.to(rnoti.current, {
            y: "=100%",
            delay: 1.5,
            duration: 0.5,
            ease: "power4.inOut",
          });
        }
      );
    setemail("");
    setname("");
    setmessage("");
  };

  const rightBtn = () => {
    gsap.to(movingcontainer.current, {
      x: maxDis, // Move it to the max distance
      duration: 2, // Duration of the animation
      ease: "power4.out", // Ease type for smooth animation
    });
  };
  const leftBtn = () => {
    gsap.to(movingcontainer.current, {
      x: -maxDis / movingcontainer.current.offsetWidth, // Move it to the max distance
      duration: 1, // Duration of the animation
      ease: "power4.out", // Ease type for smooth animation
    });
  };
  const scrollToAboutMe = () => {
    console.log("working");
    secondPage.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
  const scrollToProjects = () => {
    console.log("working");
    thirpage.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const addToRefs = (el) => {
    if (el && !tiles.current.includes(el)) {
      tiles.current.push(el);
    }
  };

  const handleTileTilt = (e, tileId) => {
    const tile = document.getElementById(tileId);
    const bounds = tile.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    const rotateX = (centerY - e.clientY) / 35; // Vertical tilt
    const rotateY = -(centerX - e.clientX) / 60; // Horizontal tilt

    gsap.to(tile, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.3,
    });
  };

  const resetTileTilt = (tileId) => {
    const tile = document.getElementById(tileId);
    gsap.to(tile, {
      rotationX: 0,
      rotationY: 0,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.3,
    });
  };

  const animTrigger = () => {
    let elem = box.current;
    const elems = elem.querySelectorAll("#elem");

    elems.forEach((el) => {
      const h1s = el.querySelectorAll(".item");

      gsap.to(h1s[index], {
        top: "-=100%",
        duration: 0.5,
        ease: "Expo.easeInOut",
        onComplete: function () {
          gsap.set(this._targets[0], { top: "100%" });
        },
      });
      const nextIndex = index === h1s.length - 1 ? 0 : index + 1;
      setindex(nextIndex);

      gsap.to(h1s[nextIndex], {
        top: "-=100%",
        duration: 0.5,
        ease: "Expo.easeInOut",
      });
    });
  };
  useEffect(() => {
    gsap.to(circle1.current, {
      right: "30%",
      top: "-=20%",
      duration: 10,
      yoyo: true,
      repeat: -1,
    });
    gsap.to(circle2.current, {
      left: "20%",
      bottom: "5%",
      duration: 8,
      yoyo: true,
      repeat: -1,
    });
    ScrollTrigger.create({
      trigger: secondPage.current,
      start: "top 120%", // Trigger animation when the top of the second page is at 50% viewport height

      once: true,

      onEnter: () => {
        // tiles.current.forEach((tile) => {
        let tile = tiles.current;
        gsap.fromTo(
          tile,
          {
            scale: 0, // Initial scale
            opacity: 0.3,
            transformOrigin: "top center", // Makes bottom shrink/grow first
            rotationX: 45,
          },

          {
            scale: 1, // Final scale
            opacity: 1,
            rotationX: 0,
            duration: 0.5,
            ease: "power4.out",
            stagger: 0.1,

            scrollTrigger: {
              trigger: tile,
              start: "top 70%", // Start when tile enters viewport
              end: "top 50%", // End when tile reaches halfway
              toggleActions: "play none none none",
              once: true, // Ensures the animation only happens once
            },
          }
        );
        // });
      },
    });
    setanim(false);
    const ContainerWidth = container.current; // Get container width
    const MovingDivWidth = movingcontainer.current;
    const maxDistance = ContainerWidth.offsetWidth - MovingDivWidth.offsetWidth;
    setmaxDis(maxDistance);

    const cards = container.current.querySelectorAll(".card");

    gsap.fromTo(
      cards,
      {
        scale: 0.8,
        y: "30%",
      },
      {
        scale: 1,
        duration: 0.3,
        y: "-=30%",
        stagger: 0.2,
        ease: "power1.in",
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        },
      }
    );
    const fwords = box.current.querySelectorAll(".first_word");

    gsap.fromTo(
      fwords[0],
      {
        x: "-=100%",
        scale: 0.5,
      },
      {
        x: "=100%",
        scale: 1,
        duration: 1,
      }
    );
    gsap.fromTo(
      fwords[2],
      {
        x: "-=100%",
        scale: 0.5,
      },
      {
        x: "=100%",
        scale: 1,
        duration: 1,
      }
    );
    gsap.fromTo(
      fwords[1],
      {
        x: "200%",
        scale: 0.5,
      },
      {
        x: "=100%",
        scale: 1,
        duration: 1,
      }
    );
    const contentWidth = movContainer.current.scrollWidth;

    gsap.to(movContainer.current,{
      x: `-${contentWidth-conCont.current.offsetWidth}px`, // Move left by content width
      duration: 5, // Adjust duration for speed
      repeat: -1, // Infinite repetition
      yoyo:true,
      ease: "linear", // Smooth linear scrolling
    })
  }, []);

  return (
    <>
      {/* First Page */}
      <div className="   w-[100vw] h-[100vh] relative  ">
        <nav className=" md:w-[90%] md:h-[10vh] mx-auto md:mt-5  md:justify-between md:px-10  w-[100%]  h-[10vh] mt-2  flex justify-center items-center px-2 rounded-3xl bg-opacity- backdrop-blur-lg relative shadow-2xl z-10  lg:w-[80%]  lg:h-[13vh] lg:mt-5  md:bg-transparent lg:bg-transparent ">
          <div className="hidden md:block">
            <h1 className="  font-azeret font-extrabold  text-[3.5vw] text-[rgba(255,69,0,1)]">
              Portfolio .
            </h1>
          </div>
          <div>
            <ul className="flex  md:text-[2vw] md:space-x-7  justify-center space-x-10 text-nowrap mx-5 font-semibold text-[3.2vw] lg:text-[1.5vw] uppercase md:text-gray-300 lg:text-gray-300  text-[#d97450] lg:space-x-10  ">
              <li className="hover:text-[rgba(255,69,0,1)] cursor-pointer ">
                Work
              </li>
              <li
                onClick={scrollToAboutMe}
                className="hover:text-[rgba(255,69,0,1)] cursor-pointer  "
              >
                About Me
              </li>
              <li
                onClick={scrollToProjects}
                className="hover:text-[rgba(255,69,0,1)] cursor-pointer "
              >
                Projects
              </li>
              <li className="hover:text-[rgba(255,69,0,1)] cursor-pointer ">
                <a href="public/asjadresume.docx" download={"asjadresume.docx"}>
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div
          ref={circle1}
          className="circle lg:w-[27vw] lg:h-[27vw] w-[50vw] h-[50vw] right-0  bg-[#ff4400a0] rounded-full border-[20px] border-red-600 absolute -z-0 lg:blur-[50px] lg:right-[0%] lg:top-[-35%] blur-[60px]"
        ></div>
        <div
          ref={circle2}
          className="circle w-[30vw] h-[30vw] bg-[#ff4400] rounded-full border-[20px] border-red-600 absolute -z-0 blur-[80px] left-[0%] bottom-[-30%] "
        ></div>

        <div
          ref={box}
          onClick={animTrigger}
          className=" bg--500 w-[100%] h-[65%]  relative pt-3 leading-[22vh] "
        >
          <div
            id="elem"
            className="  relative bg--300 tracking-tight italic text-white font-[1000]  font-azeret h-[28vw]  w-full text-[18vw] overflow-hidden px-2   md:h-[17vw] md:text-[15vw] lg:h-[11vw] lg:text-[12vw]"
          >
            <h1 className=" first_word item    absolute    ">CREATIVE</h1>
            <h1 className="item   absolute top-[100%] left-[25%]">I</h1>
            <h1 className="  item   absolute top-[100%]">FAST</h1>
          </div>
          <div
            id="elem"
            className="relative tracking-tight bg-[rgba(255,69,0,1)] italic text-inherit font-[1000] font-azeret h-[28vw]  w-full text-[18vw] overflow-hidden   md:h-[17vw] md:text-[15vw] lg:h-[10.5vw] lg:text-[12vw] "
          >
            <h1 className="item first_word absolute  md:right-0 lg:right0  top-0">
              WEBSITE
            </h1>
            <h1 className="item   absolute  top-[100%] md:right-0 lg:right0 ">
              CREATE
            </h1>
            <h1 className="item   absolute md:right-0 lg:right0 top-[100%]">
              OPTIMIZED
            </h1>
          </div>
          <div
            id="elem"
            className="relative bg- tracking-tight bg--50 italic text-white font-[1000] font-azeret h-[28vw] w-full text-[16vw] overflow-hidden  md:h-[17vw] md:text-[15vw] lg:h-[10.5vw] lg:text-[12vw] bg--500"
          >
            <h1 className="item first_word absolute   bg--400 inline top-0">
              DEVELOPER
            </h1>
            <h1 className="item   absolute top-[100%]">MAGIC</h1>
            <h1 className="item   absolute top-[100%] ">FUNCTIONAL</h1>
          </div>
        </div>

        <div ref={conCont} className=" lg:mt-10 bottom-[10%] overflow-hidden lg:rotate-[3deg]  md:text-[4vw]  lg:text-[3vw] bg-[rgba(255,69,0,1)] rotate-[8deg] text-[10vw] pt-1 font-azeret font-[1000]  space-x-2 text-nowrap   ">
          <div ref={movContainer} className="  scrollbar-hide " >
            <span> DESIGNER  </span>
            <div className="w-[5vw] h-[5vw] lg:w-[2vw] lg:h-[2vw] rounded-full bg-red-900 inline-block "></div>
            <span> DEVELOPER </span>
            <div className="w-[5vw] h-[5vw] lg:w-[2vw] lg:h-[2vw] rounded-full bg-red-900  inline-block "></div>
            <span> ENGINEER </span>
            <div className="w-[5vw] h-[5vw] lg:w-[2vw] lg:h-[2vw] rounded-full bg-red-900  inline-block "></div>
            <span> DESIGNER </span>
            <div className="w-[5vw] h-[5vw] lg:w-[2vw] lg:h-[2vw] rounded-full bg-red-900  inline-block "></div>
            <span> DEVELOPER </span>
            <div className="w-[5vw] h-[5vw] lg:w-[2vw] lg:h-[2vw] rounded-full bg-red-900  inline-block "></div>
            <span > ENGINEER </span>
          </div>
      
        </div>
      </div>

      {/* Second Page */}
      <div
        ref={secondPage}
        className="w-[100vw] h-[100vh] md:h-[100vh] lg:h-[100vh] overflow-hidden lg:overflow-visible md:overflow-visible   relative p-5 scrollbar-hide flex justify-center items-center"
      >
        <div className="  w-[80vh] h-[80vh]  rounded-full border-[30px] absolute blur-[90px] left-[30%] border-red-950 bg-[rgba(255,69,0,1)] flex justify-center items-center z-0">
          <div className="w-[50vh] h-[50vh] rounded-full bg-black  "> </div>
        </div>

        <div className="  hidden  lg:w-[90%] h-[90%]   md:grid    lg:grid grid-cols-3 grid-rows-3">
          <div className="   row-span-2 m-2 ">
            <div
              ref={addToRefs}
              id="tile1"
              onMouseMove={(e) => handleTileTilt(e, "tile1")}
              onMouseLeave={() => resetTileTilt("tile1")}
              className="  w-[100%] h-[100%]  bg-opacity-10 backdrop-blur-lg  shadow-orange-800 shadow-md overflow-hidden rounded-2xl "
            >
              <img
                src="Asjad3D.png"
                className="h-[100%] cover cover p-2 rounded-b-full mx-auto"
                alt=""
              />
            </div>
          </div>
          <div className="    col-span-2 row-span-2 flex flex-col ">
            <div
              ref={addToRefs}
              className="w-[100%] h-[30%]  bg-[rgba(255,69,0,1)] text-wrap rounded-2xl text-center text-[7vh] py-3  bg-opacity-30 backdrop-blur-md  font-extrabold font-azeret shadow-orange-900 shadow-lg "
            >
              SOFTWARE DEVELOPER.
            </div>
            <div className="w-[100%] h-[100%]    flex jusified-evenly items-center m-2 space-x-2 ">
              <div
                id="tile2"
                ref={addToRefs}
                onMouseMove={(e) => handleTileTilt(e, "tile2")}
                onMouseLeave={() => resetTileTilt("tile2")}
                className="h-[100%] w-[79%]  bg backdrop-blur-lg bg-opacity-5  rounded-2xl shadow-orange-800 shadow-lg "
              >
                <h1 className="text-[5.5vw] font-extrabold text-white text-center ">
                  Hi ! im Asjad
                </h1>
                <h1 className="text-[2.5vh] text-white px-3 italic ">
                  I am a dedicated Software Engineer . My expertise lies in
                  Website Development, with strong skills in JavaScript, CSS,
                  Tailwind CSS, and React.js. I am passionate about creating
                  modern, responsive, and user-centric web applications.I thrive
                  on exploring creative solutions and collaborating with
                  talented individuals to bring ideas to life.{" "}
                </h1>
              </div>

              <div
                id="tile3"
                ref={addToRefs}
                onMouseMove={(e) => handleTileTilt(e, "tile3")}
                onMouseLeave={() => resetTileTilt("tile3")}
                className="h-[100%] w-[19%]  bg shadow-orange-800 shadow-md bg-opacity-5 backdrop-blur-md  rounded-2xl flex flex-col justify-center items-center text-[4vh] space-y-[3vh] text-[white]  "
              >
                <a
                  target="_bank"
                  href="https://www.instagram.com/glass._of_.whiskey/"
                >
                  <GrInstagram className=" hover:shadow-white hover:shadow-lg hover:text-[5vh] duration-[0.2s] " />
                </a>

                <a target="_bank" href="https://github.com/Asjad611">
                  {" "}
                  <FaGithub className="hover:shadow-white hover:shadow-lg hover:text-[5vh] duration-[0.5s] " />
                </a>

                <a
                  target="_bank"
                  href="https://www.linkedin.com/in/asjad-mughal-53671521a/"
                >
                  {" "}
                  <FaLinkedin className="hover:shadow-white hover:shadow-lg hover:text-[5vh] duration-[0.5s]  " />
                </a>

                <a
                  target="_bank"
                  href="https://www.facebook.com/muhammad.asjad.988711"
                >
                  {" "}
                  <FaFacebook className="hover:shadow-white hover:shadow-lg hover:text-[5vh] duration-[0.5s]  " />
                </a>

                <a target="_bank" href="mailto:m.asjad61112@gmail.com">
                  {" "}
                  <TbBrandGmail className="hover:shadow-white hover:shadow-lg hover:text-[5vh] duration-[0.5s]  " />
                </a>
              </div>
            </div>
          </div>

          <div ref={addToRefs} className=" gap-2   col-span-2 overflow- flex">
            <div className=" w-[20%] ml-1 h-[100%]  bg-[rgba(255,69,0,1)] rounded-3xl shadow-orange-900 shadow-lg">
              <div className=" w-[100%] h-[100%] font-azeret font-extrabold text-[3.5vw] leading-[4vw]  px-1 py-7 -rotate-90">
                <span>TECH</span>
                <br />
                <span>STACK.</span>
              </div>
            </div>
            <div
              id="tile4"
              ref={addToRefs}
              onMouseMove={(e) => handleTileTilt(e, "tile4")}
              onMouseLeave={() => resetTileTilt("tile4")}
              className="w-[85%] h-[100%] flex flex-wrap space-x-4  rounded-3xl  shadow-orange-800 shadow-lg bg-opacity-5 backdrop-blur-md   text-[1vw]  p-5  italic  "
            >
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold text-[1.3vw] rounded-xl px-3 py-2  h-[30%]">
                HTML
              </span>
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold text-[1.3vw] rounded-xl px-3 py-2  h-[30%]">
                C++
              </span>
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold text-[1.3vw] rounded-xl px-3 py-2  h-[30%]">
                CSS
              </span>
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold text-[1.3vw] rounded-xl px-3 py-2  h-[30%]">
                Javascript
              </span>
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold text-[1.3vw] rounded-xl px-3 py-2  h-[30%]">
                React
              </span>
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold text-[1.3vw] rounded-xl px-3 py-2  h-[30%]">
                Node
              </span>
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold text-[1.3vw] rounded-xl px-3 py-2  h-[30%]">
                Tailwind
              </span>
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold text-[1.3vw] rounded-xl px-3 py-2  h-[30%]">
                GSAP
              </span>
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold text-[1.3vw] rounded-xl px-3 py-2  h-[30%]">
                Locomotive
              </span>
            </div>
          </div>
          <div
            id="tile5"
            ref={addToRefs}
            onMouseMove={(e) => handleTileTilt(e, "tile5")}
            onMouseLeave={() => resetTileTilt("tile5")}
            className=" w-[100%] h-[100%] mx-2 text-white pt-10 rounded-3xl background-blur-md bg-opacity-10 shadow-orange-800 shadow-lg p-5 text-[7vh] leading-tight font-azeret font-extrabold  text-nowrap"
          >
            <h1>Let's</h1>
            <h1 className="text-[2.5vw]">
              Work{" "}
              <span className="text-[rgba(255,69,0,1)] text-[3vw]">
                TOGETHER.
              </span>
            </h1>
          </div>
        </div>

        <div className=" md:hidden lg:hidden  w-[100%] h-[100%]   grid grid-cols-2  gap-2 grid-rows-[1fr_1fr_0.5fr_1fr]  ">
          <div className="">
            <div
              ref={addToRefs}
              id="tile1"
              onMouseMove={(e) => handleTileTilt(e, "tile1")}
              onMouseLeave={() => resetTileTilt("tile1")}
              className="  w-[100%] h-[100%]  bg-opacity-10 backdrop-blur-lg  shadow-orange-800 shadow-md overflow-hidden rounded-2xl "
            >
              <img
                src="Asjad3D.png"
                className=" cover p-2 rounded-b-full mx-auto"
                alt=""
              />
            </div>
          </div>
          <div className=" backdrop-blur-lg  shadow-orange-800 shadow-md overflow-hidden rounded-2xl font-azeret text-[7vw] font-bold text-white p-3">
            <div className="w-[100%] h-[30%] bg-[rgba(255,69,0,1)] rounded-xl">
              <h1 className="text-black text-center py-1 text-[5vw]">
                &lt;/Kodr&gt;
              </h1>
            </div>
            <h1 className="text-center text-[4vw]">Hey I'm</h1>
            <h1 className="text-[10vw] text-center text-[rgba(255,69,0,1)]">
              Asjad
            </h1>
          </div>
          <div className="col-span-2  h-[100%] ">
            <div
              id="tile2"
              ref={addToRefs}
              onMouseMove={(e) => handleTileTilt(e, "tile2")}
              onMouseLeave={() => resetTileTilt("tile2")}
              className="h-[100%] w-[100%]  bg backdrop-blur-lg bg-opacity-5  rounded-2xl shadow-orange-800 shadow-md "
            >
              <h1 className="text-[3.5vw] text-white p-4 italic text-center  ">
                I am a dedicated Software Engineer . My expertise lies in
                Website Development, with strong skills in JavaScript, CSS,
                Tailwind CSS, and React.js. I am passionate about creating
                modern, responsive, and user-centric web applications
              </h1>
            </div>
          </div>
          <div className="col-span-2 ">
            <div
              id="tile3"
              ref={addToRefs}
              onMouseMove={(e) => handleTileTilt(e, "tile3")}
              onMouseLeave={() => resetTileTilt("tile3")}
              className="h-[100%] w-[100%]  bg shadow-orange-800 shadow-md bg-opacity-5 backdrop-blur-md  rounded-2xl flex  justify-evenly items-center text-[7vw] space-y-[3vh] text-[white]  py-5"
            >
              <div className="hidden"></div>
              <a
                target="_bank"
                href="https://www.instagram.com/glass._of_.whiskey/"
              >
                <GrInstagram className=" hover:shadow-white hover:shadow-lg hover:text-[5vh] duration-[0.2s] " />
              </a>

              <a target="_bank" href="https://github.com/Asjad611">
                {" "}
                <FaGithub className="hover:shadow-white hover:shadow-lg hover:text-[5vh] duration-[0.5s] " />
              </a>

              <a
                target="_bank"
                href="https://www.linkedin.com/in/asjad-mughal-53671521a/"
              >
                {" "}
                <FaLinkedin className="hover:shadow-white hover:shadow-lg hover:text-[5vh] duration-[0.5s]  " />
              </a>

              <a
                target="_bank"
                href="https://www.facebook.com/muhammad.asjad.988711"
              >
                {" "}
                <FaFacebook className="hover:shadow-white hover:shadow-lg hover:text-[5vh] duration-[0.5s]  " />
              </a>

              <a target="_bank" href="mailto:m.asjad61112@gmail.com">
                {" "}
                <TbBrandGmail className="hover:shadow-white hover:shadow-lg hover:text-[5vh] duration-[0.5s]  " />
              </a>
            </div>
          </div>
          <div className="col-span-2 ">
            <div ref={addToRefs} className="col-span-2  flex"></div>
            <div
              id="tile4"
              ref={addToRefs}
              onMouseMove={(e) => handleTileTilt(e, "tile4")}
              onMouseLeave={() => resetTileTilt("tile4")}
              className="w-[100%] h-[100%] flex flex-wrap space-x-2 space-y-0 rounded-3xl  shadow-orange-800 shadow-lg bg-opacity-5 backdrop-blur-md   text-[3.8vw]  p-5  italic  "
            >
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold text-[3vw] rounded-xl px-3 py-1  h-[35%] ">
                HTML
              </span>
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold text-[3vw] rounded-xl px-3 py-1  h-[35%]">
                C++
              </span>
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold  rounded-xl px-3 py-1  h-[35%]">
                CSS
              </span>
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold rounded-xl px-3 py-1  h-[35%]">
                Javascript
              </span>
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold  rounded-xl px-3 py-1  h-[35%]">
                React
              </span>
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold  rounded-xl px-3 py-1  h-[35%]">
                Node
              </span>
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold rounded-xl px-3 py-1  h-[35%]">
                Tailwind
              </span>
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold  rounded-xl px-3 py-1  h-[35%]">
                GSAP
              </span>
              <span className="bg-[rgba(255,69,0,1)] font-azeret font-extrabold  rounded-xl px-3 py-1  h-[35%]">
                Locomotive
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* ThirdPage */}
      <div
        ref={thirpage}
        className="  w-[100vw] h-[100vh] relative overflow- z-0   "
      >
        <div className="-rotate-[30deg] absolute space-y-[8vw] left-[-20%] bottom-[-10%] bg-opacity blur-[50px] -z-0 ">
          <div className="   w-[80vw] h-[12vh] bg-[rgba(255,69,0,1)]  "></div>
          <div className=" w-[80vw] h-[12vh]  bg-[rgba(255,69,0,1)] translate-x-[20vw] mx-auto"></div>
          <div className=" w-[80vw] h-[12vh] bg-[rgba(255,69,0,1)]"></div>
        </div>

        <div className=" lg:w-[95%] lg:h-[95%] md:w-[95%] md:h-[95%] h-[100%] w-[100%]  relative bg-[#ff4400b8]   m-auto rounded-[2vw]  ">
          <div className=" text-[5vw] lg:text-[3.5vw] mx-auto font-extrabold space-x-2 text-center font-azeret py-5  ">
            <span>PROJECTS</span>
            <span className="text-stroke-example  font-bold ">PROJECTS</span>
            <span>PROJECTS</span>
          </div>
          {/* cards */}
          <div
            ref={container}
            className="  md:h-[85%] lg:h-[85%]  h-[100%] py-2 overflow-hidden relative  "
          >
            <div
              ref={movingcontainer}
              className="md:flex lg:flex flex flex-wrap flex-shrink-0 space-x-3 space-y-3  scrollbar-hide md:overflow-hidden lg:overflow-hidden md:absolute lg:absolute md:flex-nowrap lg:flex-nowrap"
            >
              <div></div>
              <div className="card md:w-[30vw] md:h-[73vh] lg:w-[30vw] lg:h-[73vh] w-[45%] h-[40vh]   rounded-[50px]  shrink-0 overflow-hidden   bg-red-100 bg-cover relative cursor-pointer ">
                <div className="absolute m-5 z-10">
                  <h1 className="text-[3vw]  font-extrabold text-[rgba(255,69,0,1)]  ">
                    Real Time Weather App
                  </h1>
                  <div className="space-x-2  text-[1.5vw] opacity-90">
                    {" "}
                    <span className=" px-3 py-1 text-white  rounded-2xl font-bold font-azeret tracking-wide   bg-[rgba(255,69,0,1)]   shadow-lg">
                      HTML
                    </span>
                    <span className=" px-3 py-1 text-white  rounded-2xl  font-bold font-azeret tracking-wide   bg-[rgba(255,69,0,1)]   shadow-lg">
                      Javascript
                    </span>
                    <span className=" px-3 py-1 text-white  rounded-2xl  font-bold font-azeret tracking-wide   bg-[rgba(255,69,0,1)]   shadow-lg">
                      CSS
                    </span>
                  </div>
                </div>

                <a
                  href="https://weather-app-omega-peach-56.vercel.app/"
                  target="_blank"
                >
                  <img
                    src="project1.JPG"
                    alt=""
                    className="hover:scale-110 duration-[0.5s] -z-0 h-full w-full "
                  />
                </a>
              </div>
              <div className="card md:w-[30vw] md:h-[73vh] lg:w-[30vw] lg:h-[73vh] w-[45%] h-[40vh]    rounded-[50px]  shrink-0 overflow-hidden   bg-red-100 bg-cover relative cursor-pointer ">
                <div className="absolute m-5 z-10">
                  <h1 className="text-[3vw]  font-extrabold text-[rgba(255,69,0,1)] ">
                    ToDo List Project.
                  </h1>
                  <div className="space-x-2 opacity-90  text-[1.5vw] ">
                    {" "}
                    <span className=" px-3 py-1 text-white  rounded-2xl  font-bold font-azeret tracking-wide   bg-[rgba(255,69,0,1)]   shadow-lg">
                      HTML
                    </span>
                    <span className=" px-3 py-1 text-white  rounded-2xl font-bold font-azeret tracking-wide   bg-[rgba(255,69,0,1)]   shadow-lg">
                      Javascript
                    </span>
                    <span className=" px-3 py-1 text-white  rounded-2xl  font-bold font-azeret tracking-wide   bg-[rgba(255,69,0,1)]   shadow-lg">
                      CSS
                    </span>
                  </div>
                </div>

                <a
                  target="_blank"
                  href="https://to-do-list-lovat-alpha.vercel.app/"
                >
                  <img
                    src="project2.JPG"
                    alt=""
                    className="cover hover:scale-110 duration-[0.5s] -z-0  h-full w-full"
                  />
                </a>
              </div>
              <div className="card md:w-[30vw] md:h-[73vh] lg:w-[30vw] lg:h-[73vh] w-[45%] h-[40vh]   rounded-[50px]  shrink-0 overflow-hidden   bg-red-100 bg-cover relative cursor-pointer card">
                <div className="absolute m-5 z-10">
                  <h1 className="text-[3vw]  font-extrabold text-[rgba(255,69,0,1)] ">
                    Task Manager Website
                  </h1>
                  <div className="space-x-2 opacity-90 text-[1.5vw] ">
                    <span className=" px-3 py-1 text-white   rounded-2xl  font-bold font-azeret tracking-wide   bg-[rgba(255,69,0,1)]   shadow-lg">
                      Tailwind
                    </span>
                    <span className=" px-3 py-1 text-white  rounded-2xl -2xl font-bold font-azeret tracking-wide   bg-[rgba(255,69,0,1)]   shadow-lg">
                      Javascript
                    </span>
                    <span className=" px-3 py-1 text-white  rounded-2xl -2xl font-bold font-azeret tracking-wide   bg-[rgba(255,69,0,1)]   shadow-lg">
                      React
                    </span>
                  </div>
                </div>

                <a
                  href="https://task-manager-app-ymu2.vercel.app/"
                  target="_blank"
                >
                  {" "}
                  <img
                    src="project3.JPG"
                    alt=""
                    className="cover hover:scale-110 duration-[0.5s] -z-0 h-full w-full "
                  />
                </a>
              </div>
              <div className="card md:w-[30vw] md:h-[73vh] lg:w-[30vw] lg:h-[73vh] w-[45%] h-[40vh]   rounded-[50px]  shrink-0 overflow-hidden   bg-red-100 bg-cover relative cursor-pointer card">
                <div className="absolute m-5 z-10">
                  <h1 className="text-[3vw]  font-extrabold text-[rgba(255,69,0,1)] ">
                    Task Manager Website
                  </h1>
                  <div className="space-x-2 opacity-90 text-[1.5vw] ">
                    <span className=" px-3 py-1 text-white   rounded-2xl  font-bold font-azeret tracking-wide   bg-[rgba(255,69,0,1)]   shadow-lg">
                      Tailwind
                    </span>
                    <span className=" px-3 py-1 text-white  rounded-2xl -2xl font-bold font-azeret tracking-wide   bg-[rgba(255,69,0,1)]   shadow-lg">
                      Javascript
                    </span>
                    <span className=" px-3 py-1 text-white  rounded-2xl -2xl font-bold font-azeret tracking-wide   bg-[rgba(255,69,0,1)]   shadow-lg">
                      React
                    </span>
                  </div>
                </div>

                <a
                  href="https://task-manager-app-ymu2.vercel.app/"
                  target="_blank"
                >
                  {" "}
                  <img
                    src="project3.JPG"
                    alt=""
                    className="cover hover:scale-110 duration-[0.5s] -z-0 h-full w-full"
                  />
                </a>
              </div>

              <div></div>
            </div>
          </div>

          <button
            onClick={leftBtn}
            className=" hidden md:block large:block  absolute bg-[rgba(255,69,0,1)] top-[50%] rounded-full -2 text-[0d0d0d] text-[100px]  "
          >
            <FaArrowAltCircleLeft />
          </button>

          <button
            onClick={rightBtn}
            className=" w-[100px] h-[100px] absolute bg-[rgba(255,69,0,1)] 
text-[0d0d0d] text-[100px] top-[50%] right-0 rounded-full hidden md:block large:block   "
          >
            <FaArrowAltCircleRight />
          </button>
        </div>
      </div>
      {/* Fourth Page */}
      <div className="w-[100vw] h-[100vh]  flex justify-center items-center  overflow-hidden relative">
        <div
          ref={gnoti}
          className="absolute z-20 top-[-20%] my-2 w-[40vw] h-[5.5vw] bg-green-500 rounded-[50px] p-2 text-[2vw] font-azeret font-bold text-white  "
        >
          {" "}
          <h1 className="text-center py-1">
            Message Sent <span className="text-green-700">Successfully !</span>{" "}
          </h1>
        </div>
        <div
          ref={rnoti}
          className="absolute z-20 top-[-20%] my-2 w-[40vw] h-[5.5vw] bg-red-400 rounded-[50px] p-2 text-[2vw] font-azeret font-bold text-white  "
        >
          {" "}
          <h1 className="text-center py-1">
            Message is <span className="text-red-700">Failed !</span>{" "}
          </h1>
        </div>

        <div
          ref={circle2}
          className="circle w-[30vw] h-[30vw] bg-[#ff4400] rounded-full border-[20px] border-red-600 absolute -z-0 blur-[80px] right-[0%] bottom-[-30%] "
        ></div>

        <div className="lg:w-[80%] lg:h-[85%] w-[95%] h-[90%] lg:flex lg::flex-col  rounded-3xl overflow-hidden  z-10  ">
          <div className="w-[100%] h-[40%] lg:w-[50%] lg:h-[100%]  overflow-hidden ">
            <img src="contactme.webp" alt="" className="cover lg:h-full" />
          </div>
          <div className="w-[100%] h-[60%] lg:w-[50%] lg:h-[100%] bg-white  bo bg-opacity-5 backdrop-blur-md shadow-orange-900 shadow-md lg:p-10 p-5 ">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="font-azeret lg:space-y-7 space-y-3"
            >
              <input
                type="text"
                onChange={(e) => {
                  setname(e.target.value);
                }}
                value={name}
                placeholder="Name"
                className="focus:outline-0 bg-transparent border-b-2 duration-[0.5s] focus:border-orange-900 md:text-[2.5vw] placeholder:text-[5vw] lg:placeholder:text-[3vw] text-[5vw] file:lg:text-[2.5vw] text-white w-[90%]"
                required
              />
              <input
                type="email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                value={email}
                placeholder="Email"
                className="focus:outline-0 bg-transparent border-b-2 duration-[0.5s] focus:border-orange-900 lg:text-[2.5vw] placeholder:text-[5vw] lg:placeholder:text-[3vw] text-[5vw]  text-white w-[90%]"
                required
              />
              <textarea
                onChange={(e) => {
                  setmessage(e.target.value);
                }}
                value={message}
                placeholder="Message"
                className="w-[95%] lg:max-h-[30vh] lg:min-h-[30vh] max-h-[15vh] min-h-[20vh]  max rounded-xl bg-[#fcfcfc17] text-white lg:text-[2.5vw] text-[5vw] focus:outline-none p-3"
                required
              ></textarea>
              <button
                type="submit"
                className="w-[100%] bg-[rgba(255,69,0,1)] lg:text-[2vw] text-[5vw] hover:bg-[#ff4400a0] font-extrabold text-white rounded-xl py-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
