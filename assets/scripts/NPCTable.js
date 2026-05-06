const form = document.getElementById('npcTableForm');
const tableBody = document.querySelector('#NPCTable tbody');

async function loadTableRows() {
    const response = await fetch('assets/scripts/NPCs.json');
    const npcs = await response.json();

    const visibleMods = [];
    if (document.getElementById('vanillaCheckbox').checked) visibleMods.push('vanilla');
    if (document.getElementById('calamityCheckbox').checked) visibleMods.push('calamity');
    if (document.getElementById('thoriumCheckbox').checked) visibleMods.push('thorium');
    if (document.getElementById('fargosCheckbox').checked) visibleMods.push('fargos');
    if (document.getElementById('imkSushisCheckbox').checked) visibleMods.push('imkSushis');
    if (document.getElementById('redemptionCheckbox').checked) visibleMods.push('redemption');
    if (document.getElementById('soulModCheckbox').checked) visibleMods.push('soulMod');

    if (visibleMods.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3">No mods selected</td></tr>';
        return;
    }

    if (visibleMods.length >= 1) {
        tableBody.innerHTML = '';
        // Filter rows based on selected mods
        const rows = tableBody.querySelectorAll('tr');
        npcs.forEach(npc => {
        // IF STATEMENT: Only add the row if the ID is in our allowed list
        if (allowedIds.includes(npc.id.toLowerCase())) {
            const row = tbody.insertRow();
            
            // Apply the name to the <tr> element for future reference
            row.id = `row-${npc.name.toLowerCase().replace(/\s/g, '-')}`;

            const imgCell = row.insertCell();
            const img = document.createElement('img');
            img.src = npc.imgUrl;
            img.height = 100;
            imgCell.appendChild(img);

            row.insertCell().textContent = npc.name;
            row.insertCell().textContent = npc.likedBiome;
            row.insertCell().textContent = npc.dislikedBiome;
            row.insertCell().textContent = npc.id
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
    const imkSushisChecked = document.getElementById('imkSushisCheckbox').checked;
    const redemptionChecked = document.getElementById('redemptionCheckbox').checked;
    const soulModChecked = document.getElementById('soulModCheckbox').checked;

    tableBody.innerHTML = ''; // Clear existing table rows
    // Load table rows based on selected mods
    loadTableRows();
});