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
    missingATs: [],
    collectedATs: []
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
        var currentAuthor = idToPlayerName[mapsDetail.author]

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
              userData.collectedATs.push({
                name: mapsDetail.name.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
                campaignName: campaignName.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
                authorScore: mapsDetail.authorScore,
                authorCount: authorCount,
                authorId: mapsDetail.author,
                authorName: currentAuthor
              })
            }

          } else {
            player.medalCount++;
            if(top.player.name === username)
            {
              userFound = true
              userData.collectedATs.push({
                name: mapsDetail.name.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
                campaignName: campaignName.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
                authorScore: mapsDetail.authorScore,
                authorCount: authorCount,
                authorId: mapsDetail.author,
                authorName: currentAuthor
              })
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
            authorName: currentAuthor
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
          authorName: currentAuthor
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
        authorName: currentAuthor
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
      
      <br></br>
      <p id="worldRecords">========================================================</p>
      <p><a href="#missingATs">missing ATs</a> | <a href="#collectedATs">collected ATs</a></p>
      <p><a href="https://kekl-hunt.pages.dev/">home</a></p>
      <h1 class="text-lg">World Records: {userData.worldRecords.length}</h1><br></br>
      <ul>
      {userData.worldRecords.map(wr => <li>-<font color="red">{wr.campaignName}: </font>{wr.name} <font color="blue"> - by <a class="hover:bg-blue-500 hover:text-white" href={`info?name=${wr.authorName}`}>{wr.authorName}</a> </font></li>)}

      <td><a class="hover:bg-blue-500 hover:text-white" href={`info?name=${player.name}`}>{player.name}</a></td>

      </ul>
      <br></br>
      <p id="missingATs"> ========================================================</p>
      <p><a href="#top">Top</a></p>
      <p><a href="#worldRecords">world records</a> | <a href="#collectedATs">collected ATs</a></p>
      <p><a href="https://kekl-hunt.pages.dev/">home</a></p>
      <h1 class="text-lg">Missing ATs: {userData.missingATs.length}</h1><br></br>

      <ul>
      {userData.missingATs.map(missing => <li>-<font color="red">{missing.campaignName}: </font>{missing.name} <font color="blue">- by <a class="hover:bg-blue-500 hover:text-white" href={`info?name=${missing.authorName}`}>{missing.authorName}</a></font></li>)}
      </ul>
      <br></br>
      <p id="collectedATs"> ========================================================</p>
      <p><a href="#top">Top</a></p>
      <p><a href="#worldRecords">world records</a> | <a href="#missingATs">missing ATs</a></p>
      <p><a href="https://kekl-hunt.pages.dev/">home</a></p>
      <h1 class="text-lg">collected ATs: {userData.collectedATs.length}</h1><br></br>
      <ul>
      {userData.collectedATs.map(collected => <li>-<font color="red">{collected.campaignName}: </font>{collected.name} <font color="blue"> by <a class="hover:bg-blue-500 hover:text-white" href={`info?name=${collected.authorName}`}>{collected.authorName}</a></font></li>)}
      </ul>
      
    </main>
  )
}