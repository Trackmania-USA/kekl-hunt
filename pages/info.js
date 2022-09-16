import Head from 'next/head'
import {useRouter} from "next/router"

import {
  useState
}  from 'react'

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
    collectedATs: [],
    playedButNoAT: [],
    createdMaps: []
  }
  var myData = {
    maps: [],
    players: {},
    mapAuthorCount: 0
  }

  var myMaps = []
  var mapAuthors = new Set();
  var userFound = false
  var authorToNumberOfMapsCreatedBy = {};

  var idToPlayerName = {}
  for (var campaign of data.campaigns) {

    var campaignName = campaign.detail.campaign.name;

    // console.log("name, count", campaignName, campaign.mapsDetail.length);

    for (var mapsDetail of campaign.mapsDetail) {
      var record = campaign.mapsRecords[mapsDetail.mapUid];
      
      if (authorToNumberOfMapsCreatedBy[mapsDetail.author]) {
        authorToNumberOfMapsCreatedBy[mapsDetail.author]++;
      } else {
        authorToNumberOfMapsCreatedBy[mapsDetail.author] = 1;
      }

      // console.log(record)
      var authorCount = 0;
      var WRHolder = "";
      var WRTime = 999999;
      
      if (!record.tops) {
        record.tops = []; 
      }
      
      for (var top of record.tops) {

        idToPlayerName[top.player.id] = top.player.name;
        var currentAuthor = idToPlayerName[mapsDetail.author]

        if (!myData.players[top.player.name]) {
          myData.players[top.player.name] = {
            medalCount: 0,
            WRCount: 0
          }
        }
        if (top.time <= mapsDetail.authorScore) {
          authorCount++;

          myData.players[top.player.name].medalCount++;

          if (top.player.name === username) {
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

          userData.playedButNoAT.push({
            name: mapsDetail.name.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
            campaignName: campaignName.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
            authorScore: mapsDetail.authorScore,
            authorCount: authorCount,
            authorId: mapsDetail.author,
            authorName: currentAuthor
          })
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
      
      if (WRHolder){
        myData.players[WRHolder].WRCount++
      }
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
  var mapCreatedCount = 0;
  for (var id of Object.keys(authorToNumberOfMapsCreatedBy)) {
    if (username === idToPlayerName[id]) {
      mapCreatedCount = authorToNumberOfMapsCreatedBy[id]
    }
  }

  myData.mapAuthorCount = mapAuthors.size;
  myData.maps = allMaps;
  //console.log(myData.players["rockskater89"])

  for (var campaign of data.campaigns) {

    console.log("createdMaps", userData.createdMaps)
    var campaignName = campaign.detail.campaign.name;

   for (var mapsDetail of campaign.mapsDetail) {

    console.log("author", idToPlayerName[mapsDetail.author], username)
    
    if (username == idToPlayerName[mapsDetail.author]) {
      userData.createdMaps.push({
        name: mapsDetail.name.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
        campaignName: campaignName.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPpBb]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
        id: mapsDetail.mapUid,
        authorName: username
      })
    }
   }
  }

  console.log(userData.createdMaps)

  var playersList = []
  for (var player in myData.players) {
    var p = {}
    p.medalCount = myData.players[player].medalCount
    p.WRCount = myData.players[player].WRCount
    p.name = player
    playersList.push(p)
  }

  const [tab, setTab] = useState("missing");

  return (
    <main>
      <Head>
        KEKL Hunt - {username}
      </Head>

      <div className="navbar bg-base-100 flex justify-between">
        <a className="font-bold normal-case text-5xl ">{username}</a>
        <div className="stats shadow">
          <div className="stat bg-primary text-primary-content ">
            <div className="stat-title">World Records</div>
            <div className="stat-value">{userData.worldRecords.length}</div>
            <div className="stat-desc">by {username}</div>
          </div>

          <div className="stat bg-primary text-primary-content ">
            <div className="stat-title">Collected ATs</div>
            <div className="stat-value">{userData.collectedATs.length}</div>
            <div className="stat-desc">by {username}</div>
          </div>

          <div className="stat bg-primary text-primary-content ">
            <div className="stat-title">Played Maps</div>
            <div className="stat-value">{  
              userData.playedButNoAT.length + userData.collectedATs.length
            }</div>
            <div className="stat-desc">by {username}</div>
          </div>

          <div className="stat bg-primary text-primary-content ">
            <div className="stat-title">Missing ATs</div>
            <div className="stat-value">{userData.missingATs.length}</div>
            <div className="stat-desc">by {username}</div>
          </div>
          <div className="stat bg-primary text-primary-content ">
            <div className="stat-title">Created Maps</div>
            <div className="stat-value">{mapCreatedCount ? mapCreatedCount : 0}</div>
            <div className="stat-desc">by {username}</div>
          </div>
        </div>
      </div> 

      <div className="tabs tabs-boxed">
        <a className={"tab tab-lg "}
                href="/"
        >Home</a> 
        <button className={"tab tab-lg " + (tab==="wrs"? "tab-active" : "")}
        onClick={() => setTab("wrs")}
        >World Records</button>
        <button className={"tab tab-lg " + (tab==="collected"? "tab-active" : "")}
        onClick={() => setTab("collected")}
        >Collected ATs</button> 
        <button className={"tab tab-lg " + (tab==="played"? "tab-active" : "")}
                onClick={() => setTab("played")}
        >Played but no AT</button> 
        <button className={"tab tab-lg " + (tab==="missing"? "tab-active" : "")}
        onClick={() => setTab("missing")}
        >Missing ATs</button> 
        <button className={"tab tab-lg " + (tab==="created"? "tab-active" : "")}
        onClick={() => setTab("created")}
        >Created Maps</button> 
      </div>


      {tab === "wrs" ? 
      <div className="flex align-middle justify-center pt-4">

        <table className="table table-zebra ">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Track</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>

            {userData.worldRecords.map(wr => 
              <tr key={wr.campaignName + "." + wr.name}>
                <td className="">{wr.campaignName}</td>
              <td className="max-w-xl truncate">{wr.name}</td>
              <td className="">
              <a className="btn btn-accent" href={`info?name=${wr.authorName}`}>{wr.authorName}</a>
              
              </td>
            </tr>
            )}      
            </tbody>
        </table>
        </div>
      : <></>}
      {tab === "missing" ? 
      <div className="flex align-middle justify-center pt-4">

      <table className="table table-zebra ">
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Track</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>

                   {userData.missingATs.map(missing =>
                        
                        <tr key={missing.campaignName + "." + missing.name}>
                        <td className="">{missing.campaignName}</td>
                        <td className="max-w-xl truncate">{missing.name}</td>
                        <td className="">
                        <a className="btn btn-accent" href={`info?name=${missing.authorName}`}>{missing.authorName}</a>
                        
                        </td>
                      </tr>
                                              
                        )}
            </tbody>
        </table>
        </div>
        
        : <></>}
      {tab === "collected" ? 
      <div className="flex align-middle justify-center pt-4">

      <table className="table table-zebra ">
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Track</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>

                   {userData.collectedATs.map(collected =>
                        
                        <tr key={collected.campaignName + "." + collected.name}>
                        <td className="">{collected.campaignName}</td>
                        <td className="max-w-xl truncate">{collected.name}</td>
                        <td className="">
                        <a className="btn btn-accent" href={`info?name=${collected.authorName}`}>{collected.authorName}</a>
                        
                        </td>
                      </tr>
                                              
                        )}
            </tbody>
        </table>
        </div>  
        
      : <></>}
      {tab === "played" ? 

<div className="flex align-middle justify-center pt-4">

<table className="table table-zebra ">
  <thead>
    <tr>
      <th>Campaign</th>
      <th>Track</th>
      <th>Author</th>
    </tr>
  </thead>
  <tbody>

             {userData.playedButNoAT.map(played =>
                  
               <tr key={played.campaignName + "." + played.name}>
                  <td className="">{played.campaignName}</td>
                  <td className="max-w-xl truncate">{played.name}</td>
                  <td className="">
                  <a className="btn btn-accent" href={`info?name=${played.authorName}`}>{played.authorName}</a>
                  
                  </td>
                </tr>
                                        
                  )}
      </tbody>
  </table>
  </div>  

      : <></>}
      {tab === "created" ? 
      <div className="flex align-middle justify-center pt-4">

      <table className="table table-zebra ">
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Track</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>

                   {userData.createdMaps.map(created =>
                        
                        <tr key={created.campaignName + "." + created.name}>
                        <td className="">{created.campaignName}</td>
                        <td className="max-w-xl truncate">{created.name}</td>
                        <td className="">
                        <a className="btn btn-accent" href={`info?name=${created.authorName}`}>{created.authorName}</a>
                        
                        </td>
                      </tr>
                                              
                        )}
            </tbody>
        </table>
        </div>  
        
      : <></>}
    </main>
  )
}
