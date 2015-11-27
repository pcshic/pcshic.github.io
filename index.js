var PcshicApp = React.createClass({
  getInitialState: function() {
    return {
      site: {
        title: '板橋高中資訊社',
        sub: 'pcshic'
      },
      part: [
        {
          title: '成果',
          sub: '歷年資訊學科能力競賽成績',
          icon: 'trophy',
          data: './data/trophy.yml',
          tab:  'trophy',
          comp: <Trophy />
        },
        {
          title: '名人堂',
          sub: '歷屆資訊社名人',
          icon: 'sun',
          data: './data/hall.yml',
          tab:  'hall',
          comp: <PeopleList />
        },
        {
          title: '社友',
          sub: '資訊社的好夥伴們',
          icon: 'send',
          data: './data/friend.yml',
          tab:  'friend',
          comp: <PeopleList />
        }
      ]
    }
  },
  yearSorter: function(L, R) {
    return R.year - L.year;
  },
  render: function() {
    var site = this.state.site;
    var part = this.state.part;
    var sorter = this.yearSorter;
    return (
      <section id="main" className="ui center aligned container">
        <div className="ui basic segment">
          <SiteHeader site={site} />
          <SiteMenu>
            {part}
          </SiteMenu>
        </div>
        <div id="body">
        {
          part.map(function (art) {
            return (
              <SiteArticle art={art}>
              {
                React.cloneElement(art.comp, {
                  data:   art.data,
                  sorter: sorter
                })
              }
              </SiteArticle>
            )
          })
        }
        </div>
        <SiteFooter />
      </section>
    )
  }
});

var SiteHeader = React.createClass({
  render: function() {
    return (
      <header id="title" className="ui icon header">
      <div className="content">
        <h1>{this.props.site.title}</h1>
        <small className="sub header">{this.props.site.sub}</small>
      </div>
      </header>
    )
  }
})

var SiteMenu = React.createClass({
  componentDidMount: function() {
    $('.menu .item').tab();
  },
  render: function() {
    var children = this.props.children || [];
    if ( !Array.isArray(children) )
      children = [children];
    return (
      <nav className="ui pointing labeled icon menu">
      {
        children.map(function (child) {
          return (
            <div className="item" data-tab={child.tab}>
              <i className={child.icon + " icon"}></i>
              {child.title}
            </div>
          )
        })
      }
      </nav>
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

var SiteArticle = React.createClass({
  render: function() {
    var art   = this.props.art;
    return (
      <article className="ui basic tab segment" data-tab={art.tab}>
        <header className="ui icon header">
          <i className={art.icon + " icon"}></i>
          <div className="content">
            <h2>{art.title}</h2>
            <div className="sub header">{art.sub}</div>
          </div>
        </header>
        { this.props.children }
      </article>
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
    var url    = this.props.data;
    $.get(url, function (data) {
      comp.setState({
        users: YAML.parse(data).sort(comp.props.sorter)
      })
    })
  },
  render: function() {
    var users = this.state.users;
    return (
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
    var url    = this.props.data;
    $.get(url, function (data) {
      comp.setState({
        contest: YAML.parse(data).sort(comp.props.sorter)
      })
    })
  },
  render: function() {
    var contest = this.state.contest;
    return (
      <table className="ui center aligned celled structured striped table">
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