import Head from 'next/head'
import {
  useState
}  from 'react'

export async function getStaticProps() {
  // fetch list of posts
  const response = await fetch(
    'https://raw.githubusercontent.com/Trackmania-USA/kekl-track-data/main/data.json'
  )
  const data = await response.json()

  // console.log(data)
  // do the data processing at build time!

  var myData = {
    maps: [],
    players: {},
    mapAuthorCount: 0
  }

  var myMaps = []
  var mapAuthors = new Set();

  var idToPlayerName = {}
  for (var campaign of data.campaigns) {

    var campaignName = campaign.detail.campaign.name;

    // console.log("name, count", campaignName, campaign.mapsDetail.length);

    for (var mapsDetail of campaign.mapsDetail) {
      var record = campaign.mapsRecords[mapsDetail.mapUid];

      mapAuthors.add(mapsDetail.author)

      // console.log(record)
      var authorCount = 0;
      var WRHolder = "";
      var WRTime = 999999;
      
      if (!record.tops) {
        record.tops = []; 
      }
      
      for (var top of record.tops) {

        idToPlayerName[top.player.id] = top.player.name;

        if (!myData.players[top.player.name]) {
          myData.players[top.player.name] = {
            medalCount: 0,
            WRCount: 0
          }
        }

        if (top.time <= mapsDetail.authorScore) {
          authorCount++;
          myData.players[top.player.name].medalCount++
        }

        if (top.time <= WRTime) {
          WRHolder = top.player.name
          WRTime = top.time
        }
      }
      
      if (WRHolder){
        myData.players[WRHolder].WRCount++
      }
      //console.log("wr holder ", WRHolder, myData.players[WRHolder], " got wr on ", mapsDetail.name)
      myMaps.push({
        name: mapsDetail.name.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
        campaignName: campaignName.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
        authorScore: mapsDetail.authorScore,
        authorCount: authorCount,
        authorId: mapsDetail.author,
        authorName: ""
      })
    }
  }

  var allMaps = []

  for (var map of myMaps) {
    map.authorName = idToPlayerName[map.authorId]
    allMaps.push(map)
  }

  myData.mapAuthorCount = mapAuthors.size;
  myData.maps = allMaps;
  console.log(myData.players["rockskater89"])
  return {
    props: {
      myData,
    },
  }
}

export default function IndexPage({ myData }) {
  //  console.log(myData.players)

  var playersList = []
  for (var player in myData.players) {
    var p = {}
    p.medalCount = myData.players[player].medalCount
    p.WRCount = myData.players[player].WRCount
    p.name = player
    playersList.push(p)
  }

  const [tab, setTab] = useState("players");


  return (
    <main>
      <Head>
        KEKL Hunt
      </Head>
      <div className="navbar bg-base-100 flex justify-between">
        <a className="font-bold normal-case text-5xl ">KEKL (15 Minutes)</a>
        <div className="stats shadow">

          <div className="stat bg-primary text-primary-content ">
            <div className="stat-title">Total Tracks</div>
            <div className="stat-value">{myData.maps.length}</div>
          </div>
          <div className="stat bg-primary text-primary-content ">
            <div className="stat-title">KEKL Map Authors</div>
            <div className="stat-value">{myData.mapAuthorCount}</div>
          </div>
          <div className="stat bg-primary text-primary-content ">
            <div className="stat-title">Player Count</div>
            <div className="stat-value">{playersList.length}</div>
          </div>

        </div>
      </div>    
      <div class="tabs tabs-boxed">
        <button class={"tab tab-lg " + (tab==="players"? "tab-active" : "")}
        onClick={() => setTab("players")}
        >Players</button> 
        <button class={"tab tab-lg " + (tab==="tracks"? "tab-active" : "")}
                onClick={() => setTab("tracks")}
        >Tracks</button> 
      </div>
      <div className='w-full'>

      {(tab==="players"? 
        <div className="flex align-middle justify-center pt-4">
        <table className="table table-zebra ">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Medals</th>
              <th>WRs</th>
            </tr>
          </thead>
          <tbody>
            {playersList.sort(function (a, b) { return b.medalCount - a.medalCount }).map((player, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <a className="btn btn-accent" href={`info?name=${player.name}`}>
                  
                  {player.name}</a>
                  
                  </td>
                <td>{player.medalCount}</td>
                <td>{player.WRCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>      : <></>)}
      {(tab==="tracks"? 
        <div className="flex align-middle justify-center pt-4">
        <table className="table table-zebra border-black border-b">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Track</th>
              <th>Author</th>
              <th>Number of players who got Author Medal</th>
            </tr>
          </thead>
          <tbody>
            {myData.maps.sort(function (a, b) { return a.authorCount - b.authorCount }).map((track, index) => (
              <tr key={index}>
                <td className="">{track.campaignName}</td>
                <td className="">
                  <p className="max-w-xl truncate">
                  {track.name}

                  </p>
                  
                  </td>
                <td className="">
                   {track.authorName}
                  </td>
                <td>{track.authorCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    : <></>)}

      </div>
    </main>
  )
}
