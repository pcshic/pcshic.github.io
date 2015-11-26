var PcshicApp = React.createClass({
  render: function() {
    return (
      <section id="main" className="ui center aligned container">
        <SiteTitle />
        <SiteBody />
      </section>
    )
  }
});

var SiteTitle = React.createClass({
  render: function() {
    return (
      <header id="title" className="ui vertical segment">
        <div className="ui icon header">
        <div className="content">
          <h1>板橋高中資訊社</h1>
          <small className="sub header">pcshic</small>
        </div>
        </div>
      </header>
    )
  }
})

var SiteBody = React.createClass({
  render: function() {
    return (
      <div id="body">
        <AwardHall />
      </div>
    )
  }
})

var AwardHall = React.createClass({
  render: function() {
    return (
      <article className="ui basic segment">
        <header className="ui icon header">
          <i className="sun icon"></i>
          <div className="content">
            <h2>名人堂</h2>
            <div className="sub header">歷屆資訊社名人</div>
          </div>
        </header>
      </article>
    )
  }
})

$(document).ready(function() {
  ReactDOM.render(<PcshicApp />, document.body);
});