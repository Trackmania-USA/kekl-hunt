import Head from 'next/head'

export default function AboutPage() {

    return (
        <main>
            <Head>
                KEKL Hunt | About
            </Head>
            <div className="navbar bg-base-100 flex justify-between p-20">
                <a className="font-bold normal-case text-5xl ">KEKL (15 Minutes)</a>

                <a className="btn btn-secondary" href="/">
                    Home</a>
            </div>

            <div className="flex flex-column">

            <article class="prose p-20">
                <div class="divider">Weekly Schedule</div>
                <p>

                    5:45 PM CT Tuesdays TM2 <br></br>
                    5:45 PM CT Wednesdays TM2020<br></br>
                    4:30 PM CT Fridays TM2<br></br>
                    9:00 PM CT Saturdays TM2020<br></br>
                </p>
                <div class="divider">Rules</div>

                <ol>
                    <li>
                        15 minutes to map, 5 minutes to validate; the host will say when to start/stop.
                        You must be in voice chat for this but are not required to say anything.
                    </li>
                    <li>
                        No premapping, must start with blank editor.

                    </li>
                    <li>
                        No macros created before the map you were working on unless scenery and not driven on.
                    </li>
                    <li>
                        AT must be less than 1 min 30s.
                    </li>
                    <li>
                        No use of the validation tool.
                    </li>
                    <li>
                        All maps will be played in rounds, but can be skipped if rounds last over 7 minutes. (with 1m30s max AT and 3-4 rounds, this shouldn't be a problem)
                    </li>
                    <li>
                        Most players should be able to finish your map in rounds. (on the intended route set by the author time)
                    </li>
                    <li>
                        Be careful of validating maps in areas that would be dark before computing shadows.
                    </li>
                    <li>
                        Any maps that break these rules are subject to be added to the KEKL graveyard rather than the main campaign. They can still be played, but will not be tracked for the author time hunting
                    </li>
                    <li>
                        Maps can be retroactively be moved to the graveyard if it was discovered that rules were broken or the map becomes impossible due to an update or any other reason
                    </li>
                    <li>
                        If you ever feel like you set a suspiciously fast AT, please save your validation replay for the KEKL hosts and/or be ready to drive it again.
                    </li>
                </ol>
                <div class="divider">KEKL mod</div>
                <p>
                Feel free to use the KEKL mod on any of your maps!
                
                </p>
                <p>
                
                </p><div class="mockup-code">
  <pre><code>http://maniacdn.net/loontm/KEKLModV_1_0.zip</code></pre>
</div>
                <div class="divider">KEKL Item</div>
                <p>
                    Download KEKL from item exchange!
                </p>
                <a href="https://item.exchange/set/view/11687">
                https://item.exchange/set/view/11687
                </a>
                <div class="divider">KEKL Mappack</div>
                <p>
                    Upload completed KEKL maps to TMX
                </p>
                <a href="https://trackmania.exchange/s/m/1729">
                https://trackmania.exchange/s/m/1729
                </a>
                <div class="divider">KEKL Support Plugin</div>
                <p>
                Right click the text and select Save as... and save & place at Documents\Trackmania\Scripts\EditorPlugins
enable at plugins menu by clicking the square icon in middle.<br></br>

Usage <br></br>
Click start wait for the timeouts after both phases ends you're forced to freelook so you can't place blocks. <br></br>

                </p>
                <a href="http://reaby.kapsi.fi/trackmania/plugins/mapeditor/KEKL.Script.txt">
                http://reaby.kapsi.fi/trackmania/plugins/mapeditor/KEKL.Script.txt
                </a>
    
                <div class="divider">KEKL Host Notes</div>
                <p>150, 145, 140, 135, 130, 125, 120, 115, 110, 105, 100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20 ,15, 10, 5</p>
                <p>30s timeout</p>
                <p>1 warmup 7 seconds</p>
            </article>
            </div>

        </main>
    );
}
