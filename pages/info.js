import Head from 'next/head'
import {useRouter} from "next/router"

export async function getStaticProps(context) {
  // fetch list of posts
  const response = await fetch(
    'https://raw.githubusercontent.com/Trackmania-USA/kekl-track-data/main/data.json'
  )
  const data = await response.json()

  

  return {
    props: {
      data
    },
  }
}
  

export default function InfoPage({ data }) {
  // console.log(data)
  // do the data processing at build time!
  //var username = context.query.name
  const { query } = useRouter();
  var username = query.name
  var userData = {
    worldRecords: [],
    missingATs: []
  }
  var myData = {
    maps: [],
    players: {},
    mapAuthorCount: 0
  }

  var myMaps = []
  var mapAuthors = new Set();
  var userFound = false

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
      for (var top of record.tops) {

        idToPlayerName[top.player.id] = top.player.name;

        if (top.time <= mapsDetail.authorScore) {
          authorCount++;
          var player = myData.players[top.player.name]

          

          if (!player) {
            player = {
              medalCount: 1, 
              WRCount: 0
            }

            if(top.player.name === username)
            {
              userFound = true
            }

          } else {
            player.medalCount++;
            if(top.player.name === username)
            {
              userFound = true
            }
          }
          myData.players[top.player.name] = player
        }
        else
        {
          if(top.player.name === username)
          {
          userData.missingATs.push({
            name: mapsDetail.name.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
            campaignName: campaignName.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
            authorScore: mapsDetail.authorScore,
            authorCount: authorCount,
            authorId: mapsDetail.author,
            authorName: ""
          })
          userFound = true
          }
        }

        if (top.time <= WRTime)
        {
          WRHolder = top.player.name
          WRTime = top.time
        }
      }

      
      if(userFound === false)
      {
        userData.missingATs.push({
          name: mapsDetail.name.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
          campaignName: campaignName.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
          authorScore: mapsDetail.authorScore,
          authorCount: authorCount,
          authorId: mapsDetail.author,
          authorName: ""
        })
      }
      userFound = false
      
      myData.players[WRHolder].WRCount++
      //if(username === WRHolder) userData.worldRecords.push(mapsDetail);
      if(username === WRHolder) userData.worldRecords.push({
        name: mapsDetail.name.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
        campaignName: campaignName.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
        authorScore: mapsDetail.authorScore,
        authorCount: authorCount,
        authorId: mapsDetail.author,
        authorName: ""
      })
      
      /*myMaps.push({
        name: mapsDetail.name.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
        campaignName: campaignName.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
        authorScore: mapsDetail.authorScore,
        authorCount: authorCount,
        authorId: mapsDetail.author,
        authorName: ""
      })*/
    }
  }

  var allMaps = []

  for (var map of myMaps) {
    map.authorName = idToPlayerName[map.authorId]
    allMaps.push(map)
  }

  myData.mapAuthorCount = mapAuthors.size;
  myData.maps = allMaps;
  //console.log(myData.players["rockskater89"])
  var playersList = []
  for (var player in myData.players) {
    var p = {}
    p.medalCount = myData.players[player].medalCount
    p.WRCount = myData.players[player].WRCount
    p.name = player
    playersList.push(p)
  }

  return (
    <main>
      <Head>
        KEKL Hunt
      </Head>
      <a className="font-bold normal-case text-5xl ">{username}</a>
      <h1 class="text-lg">World Records: {userData.worldRecords.length}</h1><br></br>
      <ul>
      {userData.worldRecords.map(wr => <li>-{wr.campaignName}: {wr.name}</li>)}
      </ul>
      <br></br>
      <h1 class="text-lg">Missing ATs: {userData.missingATs.length}</h1><br></br>
      <ul>
      {userData.missingATs.map(missing => <li>-{missing.campaignName}: {missing.name}</li>)}
      </ul>
      
    </main>
  )
}