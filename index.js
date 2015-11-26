var PcshicApp = React.createClass({
  render: function() {
    return (
      <section id="main" className="ui center aligned container">
        <SiteHeader />
        <SiteBody />
        <SiteFooter />
      </section>
    )
  }
});

var SiteHeader = React.createClass({
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
        <FamousHall />
      </div>
    )
  }
})

var SiteFooter = React.createClass({
  render: function() {
    return (
      <footer>Powered By <a href="http://m80126colin.github.io" target="_blank">m80126colin</a> @ pcshic</footer>
    )
  }
})

var FamousHall = React.createClass({
  getInitialState: function() {
    return {
      hall: []
    }
  },
  componentDidMount: function() {
    var component = this;
    $.get('./data/hall.yml', function (data) {
      var res = {
        hall: YAML.parse(data)
      };
      component.setState(res);
    })
  },
  render: function() {
    var hall = this.state.hall;
    hall.map(function (people) {
      var type = typeof(people.school);
      if (type === 'undefined')
        people.school = [];
      else if (type === 'string')
        people.school = [people.school];
    })
    return (
      <article className="ui basic segment">
        <header className="ui icon header">
          <i className="sun icon"></i>
          <div className="content">
            <h2>名人堂</h2>
            <div className="sub header">歷屆資訊社名人</div>
          </div>
        </header>
        <div className="ui doubling four column grid">
        {
          hall.map(function (people) {
            return (
              <div className="column">
                <div className="ui card">
                  <div className="content">
                    <div className="header">{people.name}</div>
                    <div className="meta list">
                    {
                      (people.year) ?
                        <IconItem icon="arrow right" value={people.year} /> :
                        ''
                    }
                    </div>
                  </div>
                  <div className="content">
                    <div className="description list">
                    {
                      (people.nick) ?
                        <IconItem icon="user" value={"a.k.a. " + people.nick} /> :
                        ''
                    }
                    {
                      people.school.map(function (name) {
                        return <IconItem icon="student" value={name} />
                      })
                    }
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
        </div>
      </article>
    )
  }
})

var IconItem = React.createClass({
  render: function() {
    return (
      <div className="item">
        <i className={this.props.icon + " icon"}></i> {this.props.value}
      </div>
    )
  }
})

$(document).ready(function() {
  ReactDOM.render(<PcshicApp />, document.body);
});