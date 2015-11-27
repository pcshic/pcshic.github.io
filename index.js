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
  yearSorter: function(L, R) {
    return R.year - L.year;
  },
  render: function() {
    return (
      <div id="body">
        <Trophy
          url="./data/trophy.yml"
          sorter={this.yearSorter} />
        <PeopleList
          title="名人堂"
          sub="歷屆資訊社名人"
          url="./data/hall.yml"
          sorter={this.yearSorter} />
        <PeopleList
          title="社友"
          sub="資訊社的好夥伴們"
          url="./data/friend.yml"
          sorter={this.yearSorter} />
      </div>
    )
  }
})

var SiteFooter = React.createClass({
  render: function() {
    return (
      <footer id="foot">Powered By <a href="http://m80126colin.github.io" target="_blank">m80126colin</a> @ pcshic</footer>
    )
  }
})

var PeopleList = React.createClass({
  getInitialState: function() {
    return {
      users: []
    }
  },
  componentDidMount: function() {
    var comp   = this;
    var url    = this.props.url;
    $.get(url, function (data) {
      comp.setState({
        users: YAML.parse(data).sort(comp.props.sorter)
      })
    })
  },
  render: function() {
    var title = this.props.title;
    var sub   = this.props.sub;
    var users = this.state.users;
    return (
      <article className="ui basic segment">
        <header className="ui icon header">
          <i className="sun icon"></i>
          <div className="content">
            <h2>{title}</h2>
            <div className="sub header">{sub}</div>
          </div>
        </header>
        <div className="ui doubling four column grid">
        {
          users.map(function (people) {
            return (
              <div className="column">
                <PeopleCard people={people} />
              </div>
            )
          })
        }
        </div>
      </article>
    )
  }
})

var Trophy = React.createClass({
  getInitialState: function() {
    return {
      contest: []
    }
  },
  componentDidMount: function() {
    var comp   = this;
    var url    = this.props.url;
    $.get(url, function (data) {
      comp.setState({
        contest: YAML.parse(data).sort(comp.props.sorter)
      })
    })
  },
  render: function() {
    var contest = this.state.contest;
    return (
      <article className="ui basic segment">
        <header className="ui icon header">
          <i className="trophy icon"></i>
          <div className="content">
            <h2>成果</h2>
            <div className="sub header">歷年資訊學科能力競賽成績</div>
          </div>
        </header>
        <table className="ui celled structured table">
          <thead>
          <tr>
            <th rowSpan="2">年度</th>
            <th rowSpan="2">班級</th>
            <th rowSpan="2">姓名</th>
            <th colSpan="3">成績</th>
          </tr>
          <tr>
            <th>校內賽</th>
            <th>北區賽</th>
            <th>全國賽</th>
          </tr>
          </thead>
          <tbody>
          {
            contest.map(function (cont) {
              return cont.contestant.map(function (student, i) {
                return (
                  <tr>
                  {
                    (i == 0)?<td rowSpan={cont.contestant.length}>{cont.year}</td>:''
                  }
                    <td>{student.class}</td>
                    <td>{student.name}</td>
                    <td>{student.school}</td>
                    <td>{student.county}</td>
                    <td>{student.nation}</td>
                  </tr>
                )
              })
            })
          }
          </tbody>
        </table>
      </article>
    )
  }
})

var PeopleCard = React.createClass({
  render: function() {
    var people = this.props.people || {};
    var res    = [];
    // nick
    if (people.nick) res.push({ icon: "user", value: "a.k.a. " + people.nick });
    // uva
    if (people.uva) {
      res.push({ icon: "external", value: <a href={"http://uhunt.felix-halim.net/id/" + people.uva.id} target="_blank">{people.uva.name}</a> })
    }
    // school
    var type = typeof(people.school);
    if (type === 'undefined')   people.school = [];
    else if (type === 'string') people.school = [people.school];
    people.school.map(function (sname) {
      res.push({ icon: "student", value: sname });
    });
    var comp = (res && res.length) ? <SubContent data={res} /> : '';
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">{people.name}</div>
          <div className="meta list">
          {
            (people.year) ?
              <IconItem icon="arrow right" value={people.year} /> : ''
          }
          </div>
        </div>
        {comp}
      </div>
    )
  }
})

var SubContent = React.createClass({
  render: function() {
    return (
      <div className="content">
        <div className="description list">
        {
          this.props.data.map(function (attr) {
            return <IconItem icon={attr.icon} value={attr.value} />
          })
        }
        </div>
      </div>
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