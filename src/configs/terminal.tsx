import type { TerminalData } from "~/types";

const terminal: TerminalData[] = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-bio",
        title: "bio.txt",
        type: "file",
        content: (
          <div className="py-1 space-y-2">
            <div>Hey there! I'm Tarankumar — a dragon lost in the human world 🐉</div>
            <div>
              I'm a tech enthusiast passionate about cybersecurity, web development, and
              Linux systems. I enjoy exploring how technology works under the hood — from
              building modern web applications to understanding system security and
              open-source environments.
            </div>
            <div>
              My interests focus on strengthening cybersecurity skills, developing
              responsive web projects, and working with Linux for development,
              customization, and system learning.
            </div>
            <div>
              I love hands-on learning, experimenting with new tools, and constantly
              improving my technical skills while building secure and impactful solutions.
            </div>
          </div>
        )
      },
      {
        id: "about-interests",
        title: "interests.txt",
        type: "file",
        content: "Cybersecurity / Web Development / Linux / Open Source / System Security"
      },
      {
        id: "about-contact",
        title: "contact.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6 space-y-1">
            <li>
              Email:{" "}
              <a
                className="text-blue-300"
                href="mailto:ptarankumar@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                ptarankumar@gmail.com
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-300"
                href="https://github.com/tarankumar001"
                target="_blank"
                rel="noreferrer"
              >
                @tarankumar001
              </a>
            </li>
            <li>
              Linkedin:{" "}
              <a
                className="text-blue-300"
                href="https://www.linkedin.com/in/tarankumar-p-954948257/"
                target="_blank"
                rel="noreferrer"
              >
                P.Tarankumar
              </a>
            </li>
          </ul>
        )
      },
      {
        id: "about-resume",
        title: "resume.txt",
        type: "file",
        content: (
          <div>
            Resume (English):{" "}
            <a
              className="text-blue-300"
              href="https://pdflink.to/p_tarankumar/"
              target="_blank"
              rel="noreferrer"
            >
              View Resume
            </a>
          </div>
        )
      }
    ]
  },
  {
    id: "about-dream",
    title: "my-dream.cpp",
    type: "file",
    content: (
      <div className="py-1">
        <div>
          <span className="text-yellow-400">while</span>(
          <span className="text-blue-400">sleeping</span>) {"{"}
        </div>
        <div>
          <span className="text-blue-400 ml-9">money</span>
          <span className="text-yellow-400">++</span>;
        </div>
        <div>{"}"}</div>
      </div>
    )
  }
];

export default terminal;
