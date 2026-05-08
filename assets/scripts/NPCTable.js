const form = document.getElementById('npcTableForm');
const tableBody = document.querySelector('#NPCTable tbody');

async function loadTableRows() {
    const response = await fetch('assets/scripts/NPCs.json');
    const npcs = await response.json();

    const visibleMods = [];
    if (document.getElementById('vanillaCheckbox').checked) visibleMods.push('vanilla');
    if (document.getElementById('calamityCheckbox').checked) visibleMods.push('calamity');
    if (document.getElementById('thoriumCheckbox').checked) visibleMods.push('thorium');
    if (document.getElementById('fargosCheckbox').checked) visibleMods.push('fargo\'s');
    if (document.getElementById('alchemistNPCCheckbox').checked) visibleMods.push('alchemistnpc');
    if (document.getElementById('redemptionCheckbox').checked) visibleMods.push('redemption');
    if (document.getElementById('bossesCheckbox').checked) visibleMods.push('bosses_as_npcs');

    if (visibleMods.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6">No mods selected</td></tr>';
        return;
    }

    if (visibleMods.length >= 1) {
        tableBody.innerHTML = '';
        // Filter rows based on selected mods
        const rows = tableBody.querySelectorAll('tr');
        npcs.forEach(npc => {
        // IF STATEMENT: Only add the row if the ID is in our allowed list
        if (visibleMods.includes(npc.id.toLowerCase().replace(/\s/g, '_'))) {
            const row = tableBody.insertRow();
            
            // Apply the name to the <tr> element for future reference
            row.id = `row-${npc.name.toLowerCase().replace(/\s/g, '_')}`;

            row.insertCell().innerHTML = `<input type="checkbox" class="npcCheckbox" style="width: 20px; height: 20px;">`;

            const imgCell = row.insertCell();
            const img = document.createElement('img');
            img.src = `assets/images/sprites/${npc.id.toLowerCase().replace(/\s/g, '_')}/${npc.name.toLowerCase().replace(/\s/g, '_')}.png`;
            img.height = 100;
            imgCell.appendChild(img);

            const nameCell = row.insertCell();
            const nameWrapper = document.createElement('div');
            nameWrapper.style.marginLeft = '5px';
            nameWrapper.style.marginRight = '5px';
            nameWrapper.appendChild(document.createTextNode(npc.name));
            nameCell.appendChild(nameWrapper);

            // ~~~~~ Liked Biome Cell ~~~~~
            const likedCell = row.insertCell();
            const likedWrapper = document.createElement('div');
            likedWrapper.style.display = 'flex';
            likedWrapper.style.alignItems = 'center';
            likedWrapper.style.height = '124px';
            likedWrapper.style.textAlign = 'left';
            likedWrapper.style.marginRight = '5px';

            if (npc.likedBiome !== 'None' && npc.likedBiome !== 'Any') {
                const likedBiomeImg = document.createElement('img');
                likedBiomeImg.src = `assets/images/sprites/biomes/${npc.likedBiome.toLowerCase().replace(/\s/g, '_')}.webp`;
                likedBiomeImg.height = 30;
                likedBiomeImg.style.marginRight = '-5px';
                likedWrapper.appendChild(likedBiomeImg);
            } else {
                const placeholderImg = document.createElement('img');
                placeholderImg.src = `assets/images/sprites/biomes/placeholder.webp`;
                placeholderImg.height = 25;
                placeholderImg.style.marginRight = '-5px';
                likedWrapper.appendChild(placeholderImg);
            }
            
            likedWrapper.appendChild(document.createTextNode(npc.likedBiome));
            likedCell.appendChild(likedWrapper);

            // ~~~~~ Disliked Biome Cell ~~~~~
            const dislikedCell = row.insertCell();
            const dislikedWrapper = document.createElement('div');
            dislikedWrapper.style.display = 'flex';
            dislikedWrapper.style.alignItems = 'center';
            dislikedWrapper.style.height = '124px';
            dislikedWrapper.style.textAlign = 'left';
            dislikedWrapper.style.marginRight = '5px';
            
            if (npc.dislikedBiome !== 'None' && npc.dislikedBiome !== 'Any') {
                const dislikedBiomeImg = document.createElement('img');
                dislikedBiomeImg.src = `assets/images/sprites/biomes/${npc.dislikedBiome.toLowerCase().replace(/\s/g, '_')}.webp`;
                dislikedBiomeImg.height = 30;
                dislikedBiomeImg.style.marginRight = '-5px';
                dislikedWrapper.appendChild(dislikedBiomeImg);
            } else {
                const placeholderImg = document.createElement('img');
                placeholderImg.src = `assets/images/sprites/biomes/placeholder.webp`;
                placeholderImg.height = 25;
                placeholderImg.style.marginRight = '-5px';
                dislikedWrapper.appendChild(placeholderImg);
            }
            dislikedWrapper.appendChild(document.createTextNode(npc.dislikedBiome));
            dislikedCell.appendChild(dislikedWrapper);

            const sourceCell = row.insertCell();
            const sourceWrapper = document.createElement('div');
            sourceWrapper.style.display = 'flex';
            sourceWrapper.style.alignItems = 'center';
            sourceWrapper.style.height = '124px';
            sourceWrapper.style.textAlign = 'left';
            sourceWrapper.style.marginRight = '5px';
            
            const sourceImg = document.createElement('img');
            sourceImg.src = `assets/images/sprites/sources/${npc.id.toLowerCase().replace(/\s/g, '_')}.png`;
            sourceImg.height = 25;
            sourceImg.style.marginRight = '-5px';
            sourceWrapper.appendChild(sourceImg);

            sourceWrapper.appendChild(document.createTextNode(npc.id));

            sourceCell.appendChild(sourceWrapper);
        }
    });
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload

    // Get input values
    const vanillaChecked = document.getElementById('vanillaCheckbox').checked;
    const calamityChecked = document.getElementById('calamityCheckbox').checked;
    const thoriumChecked = document.getElementById('thoriumCheckbox').checked;
    const fargosChecked = document.getElementById('fargosCheckbox').checked;
    const redemptionChecked = document.getElementById('redemptionCheckbox').checked;
    const bossesChecked = document.getElementById('bossesCheckbox').checked;

    tableBody.innerHTML = ''; // Clear existing table rows
    // Load table rows based on selected mods
    loadTableRows();
});