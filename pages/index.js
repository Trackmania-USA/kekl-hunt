import Head from 'next/head'

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
    players: {}
  }

  for (var campaign of data.campaigns) {

    var campaignName = campaign.detail.campaign.name;

    // console.log("name, count", campaignName, campaign.mapsDetail.length);

    for (var mapsDetail of campaign.mapsDetail) {
      // console.log(mapsDetail)

      var record = campaign.mapsRecords[mapsDetail.mapUid];

      // console.log(record)
      var authorCount = 0;

      for (var top of record.tops) {
        if (top.time < mapsDetail.authorScore) {
          authorCount++;
          var player = myData.players[top.player.name]

          if (!player) {
            player = {
              medalCount: 0
            }
          } else {
            player.medalCount++;
          }
          myData.players[top.player.name] = player
        }
      }

      myData.maps.push({
        name: mapsDetail.name.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPp]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
        campaignName: campaignName.replace(/\$[TtIiSsWwNnMmGgZz$OoHhLlPp]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
        authorScore: mapsDetail.authorScore,
        authorCount: authorCount
      })
    }
  }

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
    p.name = player
    playersList.push(p)
  }

  return (
    <main>
      <Head>
        KEKL Hunt
      </Head>

      <h1 className='text-5xl underline'>KEKL (15 Minutes)</h1>


      <h2>Total Track Count: {myData.maps.length}</h2>

      <div className='flex'>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Track</th>
            <th>Medals</th>
          </tr>
        </thead>
        <tbody>
          {myData.maps.map((track, index) => (
            <tr key={index}>
              <td>{track.campaignName}</td>
              <td>{track.name}</td>
              <td>{track.authorCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Medals</th>
          </tr>
        </thead>
        <tbody>
          {playersList.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.medalCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </main>
  )
}
