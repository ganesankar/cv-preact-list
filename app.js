"use strict";
const { h, Component, render } = preact;
const Portal = preactPortal;
/** @jsx h */

// we want to render this component elsewhere in the DOM
class Card extends Component {

  createMarkup(v) {
    return {__html: v};
  }
  render(props) {
    return (
      <div class="row">
        {props.data &&
          props.data.length > 0 &&
          props.data.map((item, index) => (
            <div class="col-sm-12 col-md-6 col-lg-4">
              <div class="preCard preCard">
                <div
                  class="wrapper"
                  style={{
                    "background-color": item.bgr,
                    color: item.color ? item.color : "#ffffff",
                    "background-image": item.img,
                  }}
                >
                  <div class="header">
                    <div class="date">
                      {item.tags &&
                        item.tags.length > 0 &&
                        item.tags.map((itemh) => (
                          <mark class="day">{itemh}</mark>
                        ))}
                    </div>
                    <ul class="menu-content">
                      <li>
                        <a href={item.git} target="_blank">
                          {" "}
                          <i
                            class="lab la-github"
                            style={{
                              color: item.color ? item.color : "#ffffff",
                            }}
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <img src={item.img} class="imgCard" />

                  <div
                    class="data"
                    style={{
                      background:
                        "linear-gradient(0deg, { item.bgr } 0%,  { item.bgr } 100%)",
                    }}
                  >
                    <div class="content">
                      <span class="author"> </span>
                      <h2 class="title">
                        <a href={item.link} target="_blank">
                          {item.name}
                        </a>
                      </h2>
                      
                      <div class="text" dangerouslySetInnerHTML={this.createMarkup(item.desc)} />
                      <a href={item.link} target="_blank" class="button">
                        <i class="las la-external-link-alt"></i>
                        VIEW
                      </a>
                      <button class="inverse" onClick={() => this.props.toggleStory(index)} ><i class="las la-external-link-alt"></i>
                        Read Story</button>
                   
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}
class Credits extends Component {
  render(props) {
    return (
      <ol>
        {props.data &&
          props.data.length > 0 &&
          props.data.map((item) => (
            <li>
              <a href={item.link} target="_blank">
                <mark class="tag">{item.name}</mark>
              </a>
              {item.desc}
            </li>
          ))}
      </ol>
    );
  }
}
class StoryBoard extends Component {

  createMarkup(v) {
    return {__html: v};
  }
  render(props) {
    return (
      <div>
        <b class={`screen-overlay ${props.visible ? 'show' : ''}`}  onClick={() => this.props.toggleStory(0)}></b>

        <aside class= {`offcanvas ${props.visible ? 'show' : ''}`} id="my_offcanvas1">
          <div dangerouslySetInnerHTML={this.createMarkup(props.data)} />
        </aside>
      </div>
    );
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentdata: [],
      cvdata: [],
      loading: true,
      credits: [
        {
          name: "preactjs",
          link: "https://preactjs.com",
          desc: "Fast 3kB alternative to React",
        },
        {
          name: "minicss",
          link: "https://minicss.org/",
          desc: "minimal, responsive, style-agnostic CSS framework,",
        },
        {
          name: "babeljs",
          link: "https://babeljs.io/",
          desc: "JavaScript compiler",
        },
      ],
      documentDefinition: {
        pageSize: "A4",
        pageOrientation: "potrait",
        defaultStyle: {
          fontSize: 10,
          lineHeight: 1.2,
        },
        content: [
          {
            table: {
              headerRows: 1,
              widths: ["*", "*", "*", "*"],
              body: [
                [
                  { text: "Header 1", style: "tableHeader" },
                  { text: "Header 2", style: "tableHeader" },
                  { text: "Header 3", style: "tableHeader" },
                ],
                [{ text: "Hello" }, { text: "I" }, { text: "am" }],
                [{ text: "a" }, { text: "table" }, { text: "." }],
              ],
            },
          },
          {
            text: "pdfmake",
            style: "header",
          },
          "pdfmake does not generate pdfs from the html. Rather, it generates them directly from javascript.",
          "It is very fast, but very limited, especially compared to PHP alternatives.",
          "To get a pdf that looks like the page, you could use html2canvas, which generates an image that can be inserted into the pdf. I think this is a hack and not ideal",
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 10, 0, 10],
            alignment: "center",
          },
          tableHeader: {
            fillColor: "#4CAF50",
            color: "white",
          },
        },
      },
    };
  }
  toggleStory = (val) => {
    let story = "";
    if (val >= 0) {
      story = this.state.contentdata[val].story;
    }
    console.log('st',story)
    this.setState({
      showStory: !this.state.showStory,
      story,
    });
  };
   createMarkup(v) {
    return {__html: v};
  }
  componentDidMount() {
    fetch("https://ganesan-cv-reactjs.netlify.app/.netlify/functions/cv-list")
      .then((response) => response.json())
      .then((data) => {
        const contentdata = [];
        data.forEach(function (item, index) {
          contentdata.push(item.data);
        });

        this.setState({ contentdata, loading: false });
      });
  }

  render() {
    return (
      <div>
        <div class="jumbotron  ">
          <div class="stripes F"></div>
          <div class=" container content">
            <div class="row">
              <div class="col-sm-12 text-center">
                <h1> Ganesan Karuppaiya CV</h1>
                <p>
                  {" "}
                  Curriculum vitae applications listed below with the same
                  content but developed on different frameworks and libraries
                </p>
              </div>
            </div>
          </div>
          <div class="container base">
            {this.state.loading && (
              <div class="text-center ">
                {" "}
                <div class="spinner"></div>
              </div>
            )}
            {this.state.cvdata && (
              <div class="text-center m-5" >
                <a
                  class="primary"
                  href="https://ganesankar.github.io/cv/media/GanesanKaruppaiya.pdf"
                  target="_blank"
                >
                  <i class="las la-cloud-download-alt"></i> DOWNLOAD PDF
                </a>
              </div>
            )}
            <Card
              data={this.state.contentdata}
              toggleStory={this.toggleStory}
            />
          </div>
          <div class="row">
            <div class="col-sm-6 text-left">
              <label for="modal-control"> CREDITS</label>

              <input type="checkbox" id="modal-control" class="modal" />
              <div>
                <div class="card black">
                  <label for="modal-control" class="modal-close"></label>
                  <h3 class="section">This Page Developed Using</h3>
                  <div class="section">
                    <Credits data={this.state.credits} />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 text-right">
              &copy; {new Date().getFullYear()} Ganesan Karuppaiya{" "}
            </div>
          </div>
          <StoryBoard data={this.state.story} visible={this.state.showStory} toggleStory={this.toggleStory}/>
        </div>
      </div>
    );
  }
}

render(<App />, document.body);
