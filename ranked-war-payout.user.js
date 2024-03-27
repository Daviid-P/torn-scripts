// ==UserScript==
// @name         Faction Payout Link Generator
// @version      1.0
// @description  Generate links to add money to faction members' balances based on provided data.
// @author       Daviid-P [2851873]
// @match        https://www.torn.com/factions.php?step=your*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const inputData = `
Karson1987 [2870314]					23.782.578.422 €
eddiekitsner [3198831]					20.608.248.059 €
Cannon_Fodder [2367052]					12.653.251.893 €
Sagiel [2044464]					8.634.989.467 €
Joparicharbon [2522589]					7.471.993.795 €
DavidFrobisher [3182301]					5.850.674.705 €
Daviid-P [2851873]					5.323.602.775 €
Corvenus [2908257]					4.555.911.050 €
DrBoobJiggleton [2951854]					3.182.703.579 €
Coastera [3214950]					2.921.371.092 €
Askush626 [2744432]					2.093.304.071 €
SaltySquid [2944503]					1.317.679.826 €
Arklight_Glaive [2915722]					809.117.110 €
EASCAR [2937207]					794.574.156 €
Coolanteater [2922347]					0

    `;

    // Parse input data and generate links
    function generateLinks() {
        const members = inputData.trim().split('\n').map(line => {
            let [_, name, id, balance] = [...line.matchAll(/([a-zA-Z0-9-_]+? \[([0-9]+)\])\t+?([0-9,.]+) ?/g)][0];
            balance = balance.replace('.','').replace('.','').replace('.','');
            return { name, id, balance };
        });

        const links = members.map(member => {
            const url = `https://www.torn.com/factions.php?step=your#/tab=controls&addMoneyTo=${member.id}&money=${member.balance}`;
            return `<div><a href="${url}" target="_blank">${member.name}</a></div>`;
        });

        return links.join('');
    }

    function injectLinks(links) {
        const container = document.createElement('div');
        container.setAttribute('id', 'link-container');
        container.style.position = 'fixed';
        container.style.bottom = '40px';
        container.style.right = '10px';
        container.style.backgroundColor = '#ffffff';
        container.style.border = '1px solid #ccc';
        container.style.padding = '5px';
        container.style.zIndex = '9999';
        container.style.cursor = 'pointer';
        container.innerHTML = `<h5>RW Payout Links</h5><div id="link-content" style="display: none;">${links}</div>`;
        document.body.appendChild(container);

        container.querySelector("h5").addEventListener('click', function() {
            const content = document.getElementById('link-content');
            if (content.style.display === 'none') {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    }

    // Generate and inject links
    const links = generateLinks();
    setTimeout(injectLinks,3000,links);
})();
