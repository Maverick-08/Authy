import React from "react";
import Logo from "../assets/images/Logo.png";
import DeveloperImage from "../assets/images/Developer.jpg"

const Home = () => {
  return (
    <div>
      <div
        id="About"
        className="w-full pt-24 flex flex-col gap-8 justify-center items-center"
      >
        <img src={Logo} alt="Logo" className="w-[50vw] h-56" />
        <div className="w-[90vw] text-center px-4 text-2xl text-gray-500 leading-10">
          <p>
            Welcome to the{" "}
            <span className="text-gray-600 font-semibold">Authy project</span>,
            a collection of initiatives designed to help
            <span className="text-gray-600 font-semibold">
              {" "}
              new developers
            </span>{" "}
            understand the concepts of{" "}
            <span className="text-gray-600 font-semibold">
              Authentication
            </span>{" "}
            and{" "}
            <span className="text-gray-600 font-semibold">Authorization</span>.
            With the rapid{" "}
            <span className="text-gray-600 font-semibold">
              advancement of AI,
            </span>{" "}
            security threats are becoming more sophisticated. To combat these
            threats, it's crucial to adopt{" "}
            <span className="text-gray-600 font-semibold">
              modern, clean authentication practices.
            </span>
            This project aims to equip you with the essential skills needed to{" "}
            <span className="text-gray-600 font-semibold">secure</span> your
            applications effectively.
          </p>
          <p className="mt-2">
            For more information about the project, please visit the{" "}
            <a
              href="https://github.com/Maverick-08/Authentication"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              GitHub Repository
            </a>
          </p>
        </div>
      </div>
      <div id="Topics">
        <div className="w-full flex flex-col justify-center items-center gap-8 pt-20">
          <p className="text-4xl text-purple-600 font-medium">
            What you will learn !
          </p>
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-3xl font-regular">Frontend</p>
              <ul className="list-decimal px-8 py-4">
                <li className="text-2xl text-gray-400">Layout Structures</li>
                <li className="text-2xl text-gray-400">Adding AuthLayout</li>
                <li className="text-2xl text-gray-400">Outlets</li>
                <li className="text-2xl text-gray-400">
                  Persistence Authentication without using local storage
                </li>
                <li className="text-2xl text-gray-400">
                  Implementing Data Structures in Development
                </li>
                <li className="text-2xl text-gray-400">React-Router v6</li>
              </ul>
            </div>
            <div>
              <p className="text-3xl font-regular">Backend</p>
              <ul className="list-decimal px-8 py-4">
                <li className="text-2xl text-gray-400">Clean code practices</li>
                <li className="text-2xl text-gray-400">Pub-Sub model</li>
                <li className="text-2xl text-gray-400">Token Rotation</li>
                <li className="text-2xl text-gray-400">Dynamic Routes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        id="Developer"
        className="h-[100vh] w-full"
      >
        <div className="w-full flex flex-col gap-24 justify-center items-center pt-24">
          <p className="text-4xl text-purple-600 font-medium">Meet the Developer</p>
          <div className="w-[80vw] flex gap-24 items-center">
            <img src={DeveloperImage} alt="" className="w-96 h-96 rounded-lg shadow-lg"/>
            <p className="text-2xl text-gray-500 leading-10">Heyy Everyone ! My name is <span className="text-purple-600 font-medium">Vivek Ojha</span>. I am a 2nd year grad at <span className="text-purple-600 font-medium">NIT Bhopal</span>. I am a software developer with an expertise in <span className="text-purple-600 font-medium">MERN stack, Flask, Tailwind Css, React Native and AWS.</span> I describe myself as a learner who follows the idea of choosing <span className="text-purple-600 font-medium">progress over perfection !</span> This ideology keeps me going to <span className="text-purple-600 font-medium">learn new stuff</span> and figure out a way to <span className="text-purple-600 font-medium">implement</span> it in native projects!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
