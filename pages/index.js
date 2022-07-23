import Head from 'next/head'

export async function getStaticProps() {
  // fetch list of posts
  const response = await fetch(
    'https://raw.githubusercontent.com/Trackmania-USA/kekl-track-data/main/data.json'
  )
  const data = await response.json()

  console.log(data)
  // do the data processing at build time!

  var myData = {
    maps: []
  }

  for (var campaign of data.campaigns) {

    var campaignName = campaign.detail.campaign.name;

    console.log("name, count", campaignName, campaign.mapsDetail.length);

    for (var mapsDetail of campaign.mapsDetail) {
      // console.log(mapsDetail)

      var record = campaign.mapsRecords[mapsDetail.mapUid];

      // console.log(record)
      var authorCount = 0;

      for (var top of record.tops) {
        if (top.time < mapsDetail.authorScore) {
          authorCount++;
        }
      }

      myData.maps.push({
        name: mapsDetail.name.replace(/\$[tiswnmgz$ohlp]/g, '').replace(/\$[0-9A-Fa-f][0-9A-Fa-f][0-9A-Fa-f]/g, ''),
        campaignName: campaignName,
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
  console.log(myData.maps)
  return (
    <main>
      <Head>
        KEKL Hunt
      </Head>

      <h1>KEKL (15 Minutes)</h1>

      <table>
        {myData.maps.map((track, index) => (
          <tr key={index}>
            <p>{track.name}</p>
          </tr>
        ))}

      </table>
    </main>
  )
}
