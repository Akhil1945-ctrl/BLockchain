// ============================================================
//  CONSENSUS ALGORITHMS DATA MODEL
// ============================================================

const algorithms = [
    {
        id: 'pow',
        name: 'Proof of Work',
        abbr: 'PoW',
        icon: '⛏️',
        mechanism: 'Miners compete to solve complex cryptographic puzzles; the first to solve it adds the next block.',
        steps: [
            'A new transaction is broadcast to the network.',
            'Miners collect pending transactions into a candidate block.',
            'Each miner tries to find a nonce that, when hashed with the block data, produces a hash below a target difficulty.',
            'This requires massive computational effort (brute-force trial and error).',
            'The first miner to find a valid nonce broadcasts the block.',
            'Other nodes verify the solution (cheap to verify, hard to compute).',
            'The winning miner receives a block reward + transaction fees.',
            'The block is appended to the chain and all nodes update their ledger.'
        ],
        trilemma: { scalability: 3, security: 9, decentralisation: 8 },
        blockchains: [
            { name: 'Bitcoin', token: 'BTC', note: 'The original blockchain — maximum security and decentralisation via SHA-256 mining, at the cost of ~7 TPS.', layer: 'L1', languages: ['Bitcoin Script (limited)'] },
            { name: 'Litecoin', token: 'LTC', note: 'Faster block times (2.5 min vs 10 min) using Scrypt hashing for ASIC resistance.', layer: 'L1', languages: ['Bitcoin Script'] },
            { name: 'Dogecoin', token: 'DOGE', note: 'Merged-mining with Litecoin using Scrypt; community-driven meme coin.', layer: 'L1', languages: ['Bitcoin Script'] },
            { name: 'Bitcoin Cash', token: 'BCH', note: 'Bitcoin fork with larger block sizes (32 MB) for higher throughput.', layer: 'L1', languages: ['Bitcoin Script (extended)'] },
            { name: 'Monero', token: 'XMR', note: 'Privacy-focused using RandomX algorithm to stay ASIC-resistant.', layer: 'L1', languages: ['N/A (privacy-focused, no smart contracts)'] }
        ],
        cryptos: ['Bitcoin (BTC)', 'Litecoin (LTC)', 'Dogecoin (DOGE)', 'Bitcoin Cash (BCH)', 'Monero (XMR)', 'Ethereum Classic (ETC)', 'Zcash (ZEC)']
    },
    {
        id: 'pos',
        name: 'Proof of Stake',
        abbr: 'PoS',
        icon: '🥩',
        mechanism: 'Validators lock (stake) their tokens as collateral; the protocol selects a validator to propose the next block based on stake size.',
        steps: [
            'Validators deposit (stake) a minimum amount of the native token (e.g. 32 ETH for Ethereum).',
            'The protocol uses a pseudo-random selection process weighted by stake size.',
            'The selected validator proposes a new block containing valid transactions.',
            'A committee of other validators "attests" (votes) that the block is valid.',
            'Once enough attestations are gathered, the block reaches finality.',
            'The proposer and attestors earn staking rewards.',
            'If a validator acts maliciously (e.g. double-signing), their stake is slashed (partially or fully destroyed).',
            'No energy-intensive mining is needed — just staked capital.'
        ],
        trilemma: { scalability: 6, security: 8, decentralisation: 7 },
        blockchains: [
            { name: 'Ethereum', token: 'ETH', note: 'Moved from PoW to PoS ("The Merge") in Sept 2022. Uses Casper FFG + LMD GHOST for finality.', layer: 'L1', languages: ['Solidity', 'Vyper', 'Yul'] },
            { name: 'Cardano', token: 'ADA', note: 'Uses Ouroboros — a provably secure PoS protocol built on peer-reviewed academic research.', layer: 'L1', languages: ['Plutus (Haskell-based)', 'Aiken', 'Marlowe'] },
            { name: 'Tezos', token: 'XTZ', note: 'Liquid PoS — delegates can participate without locking tokens; on-chain governance for protocol upgrades.', layer: 'L1', languages: ['Michelson', 'SmartPy', 'LIGO'] },
            { name: 'Algorand', token: 'ALGO', note: 'Pure PoS with instant finality — uses a verifiable random function (VRF) for committee selection.', layer: 'L1', languages: ['TEAL', 'PyTEAL', 'Reach'] },
            { name: 'Avalanche', token: 'AVAX', note: 'Uses Snowman consensus (PoS + repeated sub-sampled voting) for high throughput.', layer: 'L1', languages: ['Solidity (EVM-compatible)', 'Rust (Subnet VMs)'] }
        ],
        cryptos: ['Ethereum (ETH)', 'Cardano (ADA)', 'Tezos (XTZ)', 'Algorand (ALGO)', 'Avalanche (AVAX)', 'Cosmos (ATOM)', 'Near Protocol (NEAR)']
    },
    {
        id: 'dpos',
        name: 'Delegated Proof of Stake',
        abbr: 'DPoS',
        icon: '🗳️',
        mechanism: 'Token holders vote to elect a fixed number of delegates (block producers) who take turns producing blocks.',
        steps: [
            'Token holders vote for delegates (block producers) proportionally to their stake.',
            'A fixed number of top-voted delegates are elected (e.g. 21 in EOS, 27 in TRON).',
            'Delegates take turns producing blocks in a round-robin schedule.',
            'Each delegate gets a time slot to produce a block.',
            'If a delegate misses their slot, the next delegate takes over.',
            'Delegates earn block rewards and share them with voters.',
            'Token holders can change their votes at any time to hold delegates accountable.',
            'This creates a representative democracy model within the blockchain.'
        ],
        trilemma: { scalability: 8, security: 6, decentralisation: 4 },
        blockchains: [
            { name: 'EOS', token: 'EOS', note: '21 elected block producers — extremely fast (4000+ TPS) but often criticised for centralisation.', layer: 'L1', languages: ['C++', 'Rust'] },
            { name: 'TRON', token: 'TRX', note: '27 Super Representatives elected; high throughput for dApps and entertainment content.', layer: 'L1', languages: ['Solidity (EVM-compatible)', 'Java'] },
            { name: 'Lisk', token: 'LSK', note: '101 elected delegates; focuses on JavaScript/TypeScript-based sidechain applications.', layer: 'L1', languages: ['JavaScript', 'TypeScript'] },
            { name: 'Ark', token: 'ARK', note: '51 elected delegates; focuses on blockchain interoperability with SmartBridge technology.', layer: 'L1', languages: ['TypeScript'] }
        ],
        cryptos: ['EOS (EOS)', 'TRON (TRX)', 'Lisk (LSK)', 'Ark (ARK)', 'Steem (STEEM)', 'BitShares (BTS)']
    },
    {
        id: 'poh',
        name: 'Proof of History',
        abbr: 'PoH',
        icon: '⏱️',
        mechanism: 'A cryptographic clock (SHA-256 hash chain) timestamps every event, allowing nodes to agree on the order of transactions without waiting for consensus messages.',
        steps: [
            'A leader node runs a continuous SHA-256 hash chain — each output becomes the input for the next hash.',
            'This creates a verifiable, sequential record of time (a "cryptographic clock").',
            'When a transaction arrives, its hash is woven into the chain at a specific position.',
            'This provides a provable timestamp — you can verify that event X happened before event Y.',
            'Because ordering is pre-established, validators don\'t need to communicate to agree on transaction order.',
            'This dramatically reduces consensus overhead and enables parallel transaction processing.',
            'PoH works alongside Tower BFT (a PoS-like voting mechanism) for block finality.',
            'The result: massive throughput (65,000+ theoretical TPS) with sub-second finality.'
        ],
        trilemma: { scalability: 9, security: 6, decentralisation: 5 },
        blockchains: [
            { name: 'Solana', token: 'SOL', note: 'Combines PoH + Tower BFT for extremely high throughput (~65,000 TPS theoretical). Prioritises speed over decentralisation.', layer: 'L1', languages: ['Rust', 'C', 'C++', 'Python (Seahorse)'] }
        ],
        cryptos: ['Solana (SOL)']
    },
    {
        id: 'poa',
        name: 'Proof of Authority',
        abbr: 'PoA',
        icon: '🏛️',
        mechanism: 'A small set of pre-approved, identity-verified validators take turns producing blocks. Reputation replaces economic stake.',
        steps: [
            'A set of trusted validators are pre-selected and their real identities are known/verified.',
            'Validators are authorised by a central governance body or by other validators.',
            'They take turns producing blocks in a deterministic rotation.',
            'Because validator identities are public, they risk reputation damage if they act maliciously.',
            'No mining or staking is required — authority comes from identity and trust.',
            'Block production is extremely fast since there are few validators and no puzzle-solving.',
            'If a validator misbehaves, they can be removed from the authority set by governance.',
            'Best suited for private/consortium blockchains or networks where participants are known.'
        ],
        trilemma: { scalability: 9, security: 5, decentralisation: 2 },
        blockchains: [
            { name: 'VeChain', token: 'VET', note: '101 Authority Masternodes — designed for enterprise supply chain tracking where trust among participants is established.', layer: 'L1', languages: ['Solidity (EVM-compatible)'] },
            { name: 'BNB Chain', token: 'BNB', note: 'Uses Proof of Staked Authority (PoSA) — a hybrid of PoA and PoS, with 21 validators.', layer: 'L1', languages: ['Solidity (EVM-compatible)'] },
            { name: 'Palm Network', token: 'PALM', note: 'PoA network focused on NFTs and digital culture, with known institutional validators.', layer: 'L2 (Ethereum sidechain)', languages: ['Solidity'] }
        ],
        cryptos: ['VeChain (VET)', 'BNB (BNB)', 'xDai (now Gnosis Chain)', 'Palm (PALM)']
    },
    {
        id: 'pbft',
        name: 'Practical Byzantine Fault Tolerance',
        abbr: 'PBFT',
        icon: '🏰',
        mechanism: 'Nodes go through a multi-round voting protocol (pre-prepare, prepare, commit) to reach consensus even if up to 1/3 of nodes are faulty or malicious.',
        steps: [
            'A client sends a request to the primary (leader) node.',
            'Pre-prepare: The primary assigns a sequence number and broadcasts a pre-prepare message to all replicas.',
            'Prepare: Each replica validates the request, and if valid, broadcasts a prepare message to all other replicas.',
            'A replica waits until it receives 2f prepare messages (where f = max faulty nodes), then enters the "prepared" state.',
            'Commit: Each prepared replica broadcasts a commit message.',
            'Once a replica receives 2f+1 commit messages, the operation is executed.',
            'The result is sent back to the client.',
            'The system tolerates up to f = (n-1)/3 faulty nodes out of n total nodes.'
        ],
        trilemma: { scalability: 5, security: 8, decentralisation: 3 },
        blockchains: [
            { name: 'Hyperledger Fabric', token: 'N/A (permissioned)', note: 'Enterprise blockchain using pluggable consensus — PBFT/Raft for ordering service among known organisations.', layer: 'L1 (permissioned)', languages: ['Go', 'JavaScript', 'Java'] },
            { name: 'Zilliqa', token: 'ZIL', note: 'Uses PBFT within shards + PoW for shard assignment. Achieves high throughput through network sharding.', layer: 'L1', languages: ['Scilla'] },
            { name: 'Tendermint (Cosmos)', token: 'ATOM', note: 'BFT-based consensus engine powering the Cosmos ecosystem — instant finality with validator sets.', layer: 'L1', languages: ['Go (Cosmos SDK)', 'Rust (CosmWasm)'] }
        ],
        cryptos: ['Zilliqa (ZIL)', 'Cosmos (ATOM)', 'NEO (NEO)', 'Ontology (ONT)']
    },
    {
        id: 'dag',
        name: 'Directed Acyclic Graph',
        abbr: 'DAG',
        icon: '🕸️',
        mechanism: 'Instead of a linear chain of blocks, transactions form a graph-like structure (DAG) where each new transaction validates previous ones.',
        steps: [
            'There are no blocks or miners — each transaction IS the consensus unit.',
            'When a user submits a transaction, they must first validate 2 or more previous unconfirmed transactions.',
            'The user\'s device performs a small proof-of-work to prevent spam.',
            'The transaction references (approves) the previous transactions it validated.',
            'This creates a directed acyclic graph (DAG) — a web of interconnected transactions.',
            'As more transactions reference earlier ones, confidence in those earlier transactions increases.',
            'Eventually, transactions become fully confirmed when enough subsequent transactions reference them.',
            'The more users transact, the faster the network becomes (positive feedback loop).'
        ],
        trilemma: { scalability: 9, security: 5, decentralisation: 7 },
        blockchains: [
            { name: 'IOTA (Tangle)', token: 'MIOTA', note: 'Designed for IoT microtransactions — zero fees, each transaction validates two prior ones.', layer: 'L1', languages: ['Rust', 'Go', 'TypeScript'] },
            { name: 'Hedera Hashgraph', token: 'HBAR', note: 'Uses "gossip about gossip" + virtual voting for asynchronous BFT. Governed by a council of major enterprises.', layer: 'L1', languages: ['Solidity (EVM-compatible)', 'Java SDK', 'JavaScript SDK'] },
            { name: 'Nano', token: 'XNO', note: 'Block-lattice architecture — each account has its own chain; uses Open Representative Voting (ORV).', layer: 'L1', languages: ['N/A (value transfer only, no smart contracts)'] }
        ],
        cryptos: ['IOTA (MIOTA)', 'Hedera (HBAR)', 'Nano (XNO)', 'Fantom (FTM)']
    },
    {
        id: 'pob',
        name: 'Proof of Burn',
        abbr: 'PoB',
        icon: '🔥',
        mechanism: 'Miners "burn" (permanently destroy) coins by sending them to an unspendable address to earn the right to mine blocks.',
        steps: [
            'A participant sends coins to a verifiably unspendable address (burn address).',
            'The more coins burned, the higher the chance of being selected to mine the next block.',
            'Burning coins is like buying a virtual mining rig — it proves commitment.',
            'The protocol verifies the burn transaction on-chain.',
            'Burned coins are gone forever — this creates scarcity and demonstrates "skin in the game".',
            'The selected participant creates the next block and earns block rewards.',
            'Over time, the "virtual mining power" from burned coins decays, requiring periodic burns.',
            'This is seen as an energy-efficient alternative to PoW, using economic sacrifice instead of electricity.'
        ],
        trilemma: { scalability: 5, security: 5, decentralisation: 6 },
        blockchains: [
            { name: 'Slimcoin', token: 'SLM', note: 'One of the few blockchains implementing PoB — combines PoW, PoS, and PoB in a hybrid model.', layer: 'L1', languages: ['N/A (basic scripting)'] },
            { name: 'Counterparty', token: 'XCP', note: 'Built on Bitcoin; initial XCP tokens were created by burning BTC.', layer: 'L2 (Bitcoin meta-protocol)', languages: ['Python (platform layer)'] }
        ],
        cryptos: ['Slimcoin (SLM)', 'Counterparty (XCP)']
    },
    {
        id: 'post',
        name: 'Proof of Space & Time',
        abbr: 'PoST',
        icon: '💾',
        mechanism: 'Farmers dedicate hard drive space (plots) and prove over time that they are still storing that data, replacing energy-intensive mining with storage.',
        steps: [
            'A farmer "plots" their hard drive — generating and storing large lookup tables of cryptographic data.',
            'Plotting is a one-time, computation-heavy process that fills disk space with pre-computed proofs.',
            'When a new block challenge is broadcast, the farmer scans their plots for a matching proof.',
            'Finding a proof in the stored data is fast — like looking up an answer in a pre-computed table.',
            'The farmer with the best proof (closest match) wins the right to create the block.',
            'Proof of Time (VDF — Verifiable Delay Function) ensures that time has actually passed between blocks.',
            'The VDF creates an unalterable, sequential chain of time proofs.',
            'This combination ensures security while using storage instead of electricity.'
        ],
        trilemma: { scalability: 5, security: 7, decentralisation: 7 },
        blockchains: [
            { name: 'Chia', token: 'XCH', note: 'Green alternative to Bitcoin — uses unused hard drive space for "farming" instead of energy-intensive mining.', layer: 'L1', languages: ['Chialisp'] }
        ],
        cryptos: ['Chia (XCH)', 'Spacemesh (SMH)']
    },
    {
        id: 'npos',
        name: 'Nominated Proof of Stake',
        abbr: 'NPoS',
        icon: '📋',
        mechanism: 'Token holders nominate trusted validators; the protocol optimally distributes stake across elected validators for maximum decentralisation.',
        steps: [
            'Any token holder can become a nominator by bonding (staking) their tokens.',
            'Nominators select up to 16 validators they trust.',
            'The election algorithm (Phragmén method) selects the active validator set.',
            'The algorithm distributes stake as evenly as possible across validators to maximise decentralisation.',
            'Selected validators produce blocks and participate in GRANDPA finality protocol.',
            'Rewards are distributed proportionally to both validators and their nominators.',
            'If a validator misbehaves (equivocation, being offline), both the validator AND their nominators get slashed.',
            'This creates strong economic incentives for nominators to choose reliable validators.'
        ],
        trilemma: { scalability: 7, security: 8, decentralisation: 8 },
        blockchains: [
            { name: 'Polkadot', token: 'DOT', note: 'Multi-chain network (relay chain + parachains). NPoS secures the relay chain; parachains inherit its security.', layer: 'L1 (Relay Chain) + L1 parachains', languages: ['Rust (Substrate/ink!)', 'AssemblyScript'] },
            { name: 'Kusama', token: 'KSM', note: 'Polkadot\'s "canary network" — same architecture but faster governance for experimental features.', layer: 'L1', languages: ['Rust (Substrate/ink!)'] }
        ],
        cryptos: ['Polkadot (DOT)', 'Kusama (KSM)']
    }
];


// ============================================================
//  PARTICLE BACKGROUND
// ============================================================
(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 160, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(100, 140, 255, ${0.06 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();
})();


// ============================================================
//  STATE
// ============================================================
let activeFilter = 'all';


// ============================================================
//  FILTER CHIPS
// ============================================================
function renderFilterChips() {
    const container = document.getElementById('filterChips');
    let html = `<button class="chip active" data-filter="all"><span class="chip-icon">✨</span> Show All</button>`;
    algorithms.forEach(algo => {
        html += `<button class="chip" data-filter="${algo.id}"><span class="chip-icon">${algo.icon}</span> ${algo.abbr}</button>`;
    });
    container.innerHTML = html;

    container.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            activeFilter = chip.dataset.filter;
            container.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            renderAll();
        });
    });
}


// ============================================================
//  OVERVIEW CARDS
// ============================================================
function renderOverviewCards() {
    const container = document.getElementById('overviewCards');
    const filtered = activeFilter === 'all' ? algorithms : algorithms.filter(a => a.id === activeFilter);

    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-results">No algorithms match your filter.</div>';
        return;
    }

    container.innerHTML = filtered.map(algo => `
        <div class="overview-card glass-card">
            <div class="algo-header">
                <div class="algo-badge">${algo.icon}</div>
                <div>
                    <div class="algo-name">${algo.name}</div>
                    <div class="algo-abbr">${algo.abbr}</div>
                </div>
            </div>
            <div class="algo-mechanism">💡 ${algo.mechanism}</div>
            <ol class="algo-steps">
                ${algo.steps.map((step, i) => `<li data-step="${i + 1}">${step}</li>`).join('')}
            </ol>
        </div>
    `).join('');
}


// ============================================================
//  RADAR CHARTS (Canvas)
// ============================================================
function drawRadarChart(canvas, scores, label) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = 260;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const maxR = 100;
    const labels = ['Scalability', 'Security', 'Decentralisation'];
    const values = [scores.scalability, scores.security, scores.decentralisation];
    const colors = ['#00e5ff', '#ff4081', '#69f0ae'];
    const angles = labels.map((_, i) => (i * 2 * Math.PI / 3) - Math.PI / 2);

    // Background rings
    for (let ring = 2; ring <= 10; ring += 2) {
        const r = (ring / 10) * maxR;
        ctx.beginPath();
        angles.forEach((angle, i) => {
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.strokeStyle = 'rgba(100, 100, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Axes
    angles.forEach(angle => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + maxR * Math.cos(angle), cy + maxR * Math.sin(angle));
        ctx.strokeStyle = 'rgba(100, 100, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
    });

    // Data polygon
    ctx.beginPath();
    values.forEach((val, i) => {
        const r = (val / 10) * maxR;
        const x = cx + r * Math.cos(angles[i]);
        const y = cy + r * Math.sin(angles[i]);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();

    // Fill with gradient
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    gradient.addColorStop(0, 'rgba(0, 229, 255, 0.25)');
    gradient.addColorStop(1, 'rgba(179, 136, 255, 0.08)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Stroke
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.7)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data points
    values.forEach((val, i) => {
        const r = (val / 10) * maxR;
        const x = cx + r * Math.cos(angles[i]);
        const y = cy + r * Math.sin(angles[i]);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    });

    // Labels with values
    const labelR = maxR + 22;
    labels.forEach((lbl, i) => {
        const x = cx + labelR * Math.cos(angles[i]);
        const y = cy + labelR * Math.sin(angles[i]);
        ctx.fillStyle = colors[i];
        ctx.font = '600 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = i === 0 ? 'bottom' : 'top';
        ctx.fillText(`${lbl}: ${values[i]}/10`, x, y);
    });
}

function renderRadarCharts() {
    const container = document.getElementById('radarCharts');
    const filtered = activeFilter === 'all' ? algorithms : algorithms.filter(a => a.id === activeFilter);

    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-results">No algorithms match your filter.</div>';
        return;
    }

    container.innerHTML = filtered.map(algo => `
        <div class="radar-card glass-card">
            <h4>${algo.icon} ${algo.name}</h4>
            <canvas id="radar-${algo.id}"></canvas>
            <div class="radar-scores">
                <span class="score-pill scalability">⚡ Scalability: ${algo.trilemma.scalability}/10</span>
                <span class="score-pill security">🛡️ Security: ${algo.trilemma.security}/10</span>
                <span class="score-pill decentralisation">🌐 Decentralisation: ${algo.trilemma.decentralisation}/10</span>
            </div>
        </div>
    `).join('');

    // Draw after DOM insertion
    requestAnimationFrame(() => {
        filtered.forEach(algo => {
            const canvas = document.getElementById(`radar-${algo.id}`);
            if (canvas) drawRadarChart(canvas, algo.trilemma, algo.abbr);
        });
    });
}


// ============================================================
//  REAL-WORLD MAPPING
// ============================================================
function renderMappingCards() {
    const container = document.getElementById('mappingCards');
    const filtered = activeFilter === 'all' ? algorithms : algorithms.filter(a => a.id === activeFilter);

    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-results">No algorithms match your filter.</div>';
        return;
    }

    container.innerHTML = filtered.map(algo => `
        <div class="mapping-card glass-card">
            <div class="mapping-header">
                <span class="algo-badge">${algo.icon}</span>
                <span class="algo-tag">${algo.name} (${algo.abbr})</span>
            </div>
            <ul class="blockchain-list">
                ${algo.blockchains.map(bc => `
                    <li class="blockchain-item">
                        <div>
                            <span class="bc-name">${bc.name}</span>
                            <span class="bc-token">${bc.token}</span>
                        </div>
                        <span class="bc-note">${bc.note}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}


// ============================================================
//  SMART CONTRACT LANGUAGES
// ============================================================
function renderLanguageCards() {
    const container = document.getElementById('languageCards');
    const filtered = activeFilter === 'all' ? algorithms : algorithms.filter(a => a.id === activeFilter);

    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-results">No algorithms match your filter.</div>';
        return;
    }

    let cards = [];
    filtered.forEach(algo => {
        algo.blockchains.forEach(bc => {
            cards.push(`
                <div class="language-card glass-card">
                    <div class="lang-header">
                        <span class="lang-chain-name">${bc.name}</span>
                        <span class="lang-consensus-tag">${algo.abbr}</span>
                    </div>
                    <div class="lang-list">
                        ${bc.languages.map(lang => `<span class="lang-tag">💻 ${lang}</span>`).join('')}
                    </div>
                </div>
            `);
        });
    });

    container.innerHTML = cards.join('');
}


// ============================================================
//  LAYER CLASSIFICATION
// ============================================================
function renderLayerCards() {
    const container = document.getElementById('layerCards');
    const filtered = activeFilter === 'all' ? algorithms : algorithms.filter(a => a.id === activeFilter);

    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-results">No algorithms match your filter.</div>';
        return;
    }

    let cards = [];
    filtered.forEach(algo => {
        algo.blockchains.forEach(bc => {
            const isL1 = bc.layer.toLowerCase().includes('l1');
            const badgeClass = isL1 ? 'l1' : 'l2';
            const badgeText = isL1 ? 'L1' : 'L2';
            cards.push(`
                <div class="layer-card glass-card">
                    <div class="lc-badge ${badgeClass}">${badgeText}</div>
                    <div class="lc-info">
                        <h4>${bc.name} <span style="color:var(--text-muted);font-weight:400;font-size:0.8rem">(${algo.abbr})</span></h4>
                        <p>${bc.layer}</p>
                    </div>
                </div>
            `);
        });
    });

    container.innerHTML = cards.join('');
}


// ============================================================
//  CRYPTOCURRENCY VARIANTS
// ============================================================
function renderCryptoVariants() {
    const container = document.getElementById('cryptoVariants');
    const filtered = activeFilter === 'all' ? algorithms : algorithms.filter(a => a.id === activeFilter);

    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-results">No algorithms match your filter.</div>';
        return;
    }

    container.innerHTML = filtered.map(algo => `
        <div class="crypto-card glass-card">
            <div class="crypto-header">
                <span class="algo-badge">${algo.icon}</span>
                <span class="crypto-algo-name">${algo.name} (${algo.abbr})</span>
            </div>
            <div class="crypto-list">
                ${algo.cryptos.map(crypto => {
                    const match = crypto.match(/^(.*?)\s*\((.*?)\)$/);
                    const name = match ? match[1] : crypto;
                    const symbol = match ? match[2] : '';
                    return `<span class="crypto-tag">${name} <span class="ct-symbol">${symbol}</span></span>`;
                }).join('')}
            </div>
        </div>
    `).join('');
}


// ============================================================
//  COMPATIBILITY MATRIX
// ============================================================
function renderCompatibilityMatrix() {
    const container = document.getElementById('compatibilityMatrix');

    // Build flat list of blockchains with their consensus
    let blockchainList = [];
    algorithms.forEach(algo => {
        algo.blockchains.forEach(bc => {
            // Only include if matches filter
            if (activeFilter === 'all' || activeFilter === algo.id) {
                blockchainList.push({ name: bc.name, consensus: algo.abbr, algoId: algo.id });
            }
        });
    });

    if (blockchainList.length < 2) {
        container.innerHTML = '<div class="no-results">Select "Show All" or compare multiple algorithms to see the compatibility matrix.</div>';
        return;
    }

    // Limit to first 15 for readability
    const list = blockchainList.slice(0, 18);

    let html = '<table><thead><tr><th></th>';
    list.forEach(bc => { html += `<th>${bc.name}</th>`; });
    html += '</tr></thead><tbody>';

    list.forEach((row, ri) => {
        html += `<tr><td>${row.name}</td>`;
        list.forEach((col, ci) => {
            let cls, text, tooltip;
            if (ri === ci) {
                cls = 'self';
                text = '—';
                tooltip = `${row.name} = same blockchain`;
            } else if (row.consensus === col.consensus) {
                cls = 'compatible';
                text = '✓';
                tooltip = `${row.name} & ${col.name}: Both use ${row.consensus} — compatible at consensus level`;
            } else {
                cls = 'incompatible';
                text = '✗';
                tooltip = `${row.name} (${row.consensus}) & ${col.name} (${col.consensus}): Different consensus — incompatible at protocol level`;
            }
            html += `<td class="matrix-cell ${cls}" data-tooltip="${tooltip}">${text}</td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table>';
    container.innerHTML = html;

    // Tooltip listeners
    const tooltipEl = document.getElementById('matrixTooltip');
    container.querySelectorAll('.matrix-cell').forEach(cell => {
        cell.addEventListener('mouseenter', (e) => {
            tooltipEl.textContent = cell.dataset.tooltip;
            tooltipEl.classList.add('visible');
        });
        cell.addEventListener('mousemove', (e) => {
            tooltipEl.style.left = (e.clientX + 14) + 'px';
            tooltipEl.style.top = (e.clientY + 14) + 'px';
        });
        cell.addEventListener('mouseleave', () => {
            tooltipEl.classList.remove('visible');
        });
    });
}


// ============================================================
//  RENDER ALL
// ============================================================
function renderAll() {
    renderOverviewCards();
    renderRadarCharts();
    renderMappingCards();
    renderLanguageCards();
    renderLayerCards();
    renderCryptoVariants();
    renderCompatibilityMatrix();
    
    // Refresh scroll reveal classes for newly rendered elements
    setTimeout(() => {
        initScrollReveal();
        // Since we are likely scrolled down when filtering, force visible class on new children
        document.querySelectorAll('.reveal').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 100) {
                el.classList.add('visible');
            }
        });
    }, 50);
}


// ============================================================
//  SCROLL REVEAL (IntersectionObserver)
// ============================================================
let globalObserver = null;

function initScrollReveal() {
    if (globalObserver) {
        globalObserver.disconnect();
    }
    
    globalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => globalObserver.observe(el));
}


// ============================================================
//  STICKY HEADER SHRINK
// ============================================================
function initStickyHeader() {
    const filterBar = document.getElementById('filter-bar');
    // Find where the filter bar starts
    const heroSection = document.getElementById('hero');
    // Or just check if scroll is beyond 300px
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300 || window.scrollY > (heroSection ? heroSection.offsetHeight - 100 : 300)) {
            filterBar.classList.add('scrolled');
        } else {
            filterBar.classList.remove('scrolled');
        }
    });
}

// ============================================================
//  INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    renderFilterChips();
    // Setting click handlers via event delegation is better for dynamically generated content, but our chips aren't remade.
    renderAll();
    initStickyHeader();
    
    // Ensure hero section and intro sections animate immediately on load if in view
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);
});
