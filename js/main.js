// Modelo de Valuation - Paes Consultoria
// Script principal

// Variáveis globais
let userData = {
    empresa: {},
    balanco: {},
    dre: {},
    parametros: {},
    resultados: {}
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Configurar manipuladores de eventos
    setupEventListeners();
    
    // Verificar se há um usuário logado
    checkLoginStatus();
    
    // Inicializar cálculos
    initCalculations();
});

// Configurar manipuladores de eventos
function setupEventListeners() {
    // Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Logout
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', handleLogout);
    }
    
    // Toggle menu mobile
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });
    }
    
    // Formulário da empresa
    const empresaForm = document.getElementById('empresa-form');
    if (empresaForm) {
        empresaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveEmpresaData();
        });
    }
    
    // Carregar exemplo
    const carregarExemplo = document.getElementById('carregar-exemplo');
    if (carregarExemplo) {
        carregarExemplo.addEventListener('click', loadExampleData);
    }
    
    // Balanço
    const calcularBalanco = document.getElementById('calcular-balanco');
    if (calcularBalanco) {
        calcularBalanco.addEventListener('click', validateBalanco);
    }
    
    const salvarBalanco = document.getElementById('salvar-balanco');
    if (salvarBalanco) {
        salvarBalanco.addEventListener('click', saveBalancoData);
    }
    
    // DRE
    const calcularDre = document.getElementById('calcular-dre');
    if (calcularDre) {
        calcularDre.addEventListener('click', calculateDRE);
    }
    
    const salvarDre = document.getElementById('salvar-dre');
    if (salvarDre) {
        salvarDre.addEventListener('click', saveDREData);
    }
    
    // Parâmetros
    const calcularWacc = document.getElementById('calcular-wacc');
    if (calcularWacc) {
        calcularWacc.addEventListener('click', calculateWACC);
    }
    
    const salvarParametros = document.getElementById('salvar-parametros');
    if (salvarParametros) {
        salvarParametros.addEventListener('click', saveParametrosData);
    }
    
    // Valuation
    const calcularValuation = document.getElementById('calcular-valuation');
    if (calcularValuation) {
        calcularValuation.addEventListener('click', performValuation);
    }
    
    // Exportar
    const exportarPdf = document.getElementById('exportar-pdf');
    if (exportarPdf) {
        exportarPdf.addEventListener('click', exportToPDF);
    }
    
    const exportarExcel = document.getElementById('exportar-excel');
    if (exportarExcel) {
        exportarExcel.addEventListener('click', exportToExcel);
    }
}

// Verificar status de login
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true') {
        showMainContent();
        loadUserData();
    } else {
        showLoginScreen();
    }
}

// Manipular login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validação simples (em um sistema real, isso seria feito no servidor)
    if (username && password) {
        // Armazenar status de login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        // Mostrar conteúdo principal
        showMainContent();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Manipular logout
function handleLogout(e) {
    e.preventDefault();
    
    // Limpar status de login
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    
    // Mostrar tela de login
    showLoginScreen();
}

// Mostrar tela de login
function showLoginScreen() {
    document.getElementById('login-screen').style.display = 'block';
    document.getElementById('main-content').style.display = 'none';
}

// Mostrar conteúdo principal
function showMainContent() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}

// Inicializar cálculos
function initCalculations() {
    // Adicionar event listeners para campos que precisam de cálculo automático
    
    // DRE
    const receitaLiquida = document.getElementById('receita-liquida');
    const custoVendas = document.getElementById('custo-vendas');
    if (receitaLiquida && custoVendas) {
        receitaLiquida.addEventListener('input', calculateLucroBruto);
        custoVendas.addEventListener('input', calculateLucroBruto);
    }
    
    const lucroBruto = document.getElementById('lucro-bruto');
    const despesasOperacionais = document.getElementById('despesas-operacionais');
    if (lucroBruto && despesasOperacionais) {
        lucroBruto.addEventListener('input', calculateEBIT);
        despesasOperacionais.addEventListener('input', calculateEBIT);
    }
    
    const ebit = document.getElementById('ebit');
    const resultadoFinanceiro = document.getElementById('resultado-financeiro');
    if (ebit && resultadoFinanceiro) {
        ebit.addEventListener('input', calculateLucroAntesIR);
        resultadoFinanceiro.addEventListener('input', calculateLucroAntesIR);
    }
    
    const lucroAntesIr = document.getElementById('lucro-antes-ir');
    const irCsll = document.getElementById('ir-csll');
    if (lucroAntesIr && irCsll) {
        lucroAntesIr.addEventListener('input', calculateLucroLiquido);
        irCsll.addEventListener('input', calculateLucroLiquido);
    }
}

// Salvar dados da empresa
function saveEmpresaData() {
    userData.empresa = {
        razaoSocial: document.getElementById('razao-social').value,
        cnpj: document.getElementById('cnpj').value,
        endereco: document.getElementById('endereco').value,
        setor: document.getElementById('setor').value,
        dataAnalise: document.getElementById('data-analise').value
    };
    
    // Salvar no localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    
    alert('Dados da empresa salvos com sucesso!');
}

// Carregar dados de exemplo
function loadExampleData() {
    // Preencher dados da empresa com exemplo
    document.getElementById('razao-social').value = 'Elétrica J. Santos Ltda';
    document.getElementById('cnpj').value = '12.345.678/0001-90';
    document.getElementById('endereco').value = 'Rua Prof. João de Oliveira Torres, 364, São Paulo, SP';
    document.getElementById('setor').value = 'energia';
    document.getElementById('data-analise').value = '2025-04-15';
    
    // Salvar dados
    saveEmpresaData();
}

// Validar balanço
function validateBalanco() {
    const ativoCirculante = parseFloat(document.getElementById('ativo-circulante').value) || 0;
    const ativoNaoCirculante = parseFloat(document.getElementById('ativo-nao-circulante').value) || 0;
    const totalAtivo = ativoCirculante + ativoNaoCirculante;
    
    const passivoCirculante = parseFloat(document.getElementById('passivo-circulante').value) || 0;
    const passivoNaoCirculante = parseFloat(document.getElementById('passivo-nao-circulante').value) || 0;
    const patrimonioLiquido = parseFloat(document.getElementById('patrimonio-liquido').value) || 0;
    const totalPassivo = passivoCirculante + passivoNaoCirculante + patrimonioLiquido;
    
    if (Math.abs(totalAtivo - totalPassivo) < 0.01) {
        alert('Balanço está equilibrado! Total do Ativo = Total do Passivo = ' + totalAtivo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
    } else {
        alert('Balanço não está equilibrado! Total do Ativo = ' + totalAtivo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) + 
              ', Total do Passivo = ' + totalPassivo.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
    }
}

// Salvar dados do balanço
function saveBalancoData() {
    const ano = document.getElementById('ano-balanco').value;
    
    if (!userData.balanco) {
        userData.balanco = {};
    }
    
    userData.balanco[ano] = {
        ativoCirculante: parseFloat(document.getElementById('ativo-circulante').value) || 0,
        caixaEquivalentes: parseFloat(document.getElementById('caixa-equivalentes').value) || 0,
        contasReceber: parseFloat(document.getElementById('contas-receber').value) || 0,
        estoques: parseFloat(document.getElementById('estoques').value) || 0,
        ativoNaoCirculante: parseFloat(document.getElementById('ativo-nao-circulante').value) || 0,
        imobilizado: parseFloat(document.getElementById('imobilizado').value) || 0,
        intangivel: parseFloat(document.getElementById('intangivel').value) || 0,
        passivoCirculante: parseFloat(document.getElementById('passivo-circulante').value) || 0,
        fornecedores: parseFloat(document.getElementById('fornecedores').value) || 0,
        emprestimosCp: parseFloat(document.getElementById('emprestimos-cp').value) || 0,
        passivoNaoCirculante: parseFloat(document.getElementById('passivo-nao-circulante').value) || 0,
        emprestimosLp: parseFloat(document.getElementById('emprestimos-lp').value) || 0,
        patrimonioLiquido: parseFloat(document.getElementById('patrimonio-liquido').value) || 0,
        capitalSocial: parseFloat(document.getElementById('capital-social').value) || 0
    };
    
    // Salvar no localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    
    alert('Dados do balanço para o ano ' + ano + ' salvos com sucesso!');
}

// Calcular lucro bruto
function calculateLucroBruto() {
    const receitaLiquida = parseFloat(document.getElementById('receita-liquida').value) || 0;
    const custoVendas = parseFloat(document.getElementById('custo-vendas').value) || 0;
    const lucroBruto = receitaLiquida - custoVendas;
    
    document.getElementById('lucro-bruto').value = lucroBruto.toFixed(2);
    
    // Recalcular EBIT quando o lucro bruto mudar
    calculateEBIT();
}

// Calcular EBIT
function calculateEBIT() {
    const lucroBruto = parseFloat(document.getElementById('lucro-bruto').value) || 0;
    const despesasOperacionais = parseFloat(document.getElementById('despesas-operacionais').value) || 0;
    const ebit = lucroBruto - despesasOperacionais;
    
    document.getElementById('ebit').value = ebit.toFixed(2);
    
    // Recalcular lucro antes do IR quando o EBIT mudar
    calculateLucroAntesIR();
}

// Calcular lucro antes do IR
function calculateLucroAntesIR() {
    const ebit = parseFloat(document.getElementById('ebit').value) || 0;
    const resultadoFinanceiro = parseFloat(document.getElementById('resultado-financeiro').value) || 0;
    const lucroAntesIr = ebit + resultadoFinanceiro;
    
    document.getElementById('lucro-antes-ir').value = lucroAntesIr.toFixed(2);
    
    // Recalcular lucro líquido quando o lucro antes do IR mudar
    calculateLucroLiquido();
}

// Calcular lucro líquido
function calculateLucroLiquido() {
    const lucroAntesIr = parseFloat(document.getElementById('lucro-antes-ir').value) || 0;
    const irCsll = parseFloat(document.getElementById('ir-csll').value) || 0;
    const lucroLiquido = lucroAntesIr - irCsll;
    
    document.getElementById('lucro-liquido').value = lucroLiquido.toFixed(2);
}

// Calcular DRE completo
function calculateDRE() {
    calculateLucroBruto();
    calculateEBIT();
    calculateLucroAntesIR();
    calculateLucroLiquido();
    
    alert('DRE calculado com sucesso!');
}

// Salvar dados do DRE
function saveDREData() {
    const ano = document.getElementById('ano-dre').value;
    
    if (!userData.dre) {
        userData.dre = {};
    }
    
    userData.dre[ano] = {
        receitaLiquida: parseFloat(document.getElementById('receita-liquida').value) || 0,
        custoVendas: parseFloat(document.getElementById('custo-vendas').value) || 0,
        lucroBruto: parseFloat(document.getElementById('lucro-bruto').value) || 0,
        despesasOperacionais: parseFloat(document.getElementById('despesas-operacionais').value) || 0,
        despesasVendas: parseFloat(document.getElementById('despesas-vendas').value) || 0,
        despesasAdministrativas: parseFloat(document.getElementById('despesas-administrativas').value) || 0,
        ebit: parseFloat(document.getElementById('ebit').value) || 0,
        resultadoFinanceiro: parseFloat(document.getElementById('resultado-financeiro').value) || 0,
        lucroAntesIr: parseFloat(document.getElementById('lucro-antes-ir').value) || 0,
        irCsll: parseFloat(document.getElementById('ir-csll').value) || 0,
        lucroLiquido: parseFloat(document.getElementById('lucro-liquido').value) || 0
    };
    
    // Salvar no localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    
    alert('Dados do DRE para o ano ' + ano + ' salvos com sucesso!');
}

// Calcular WACC
function calculateWACC() {
    const taxaLivreRisco = parseFloat(document.getElementById('taxa-livre-risco').value) || 0;
    const premioRiscoMercado = parseFloat(document.getElementById('premio-risco-mercado').value) || 0;
    const beta = parseFloat(document.getElementById('beta').value) || 0;
    const custoDivida = parseFloat(document.getElementById('custo-divida').value) || 0;
    const aliquotaIr = parseFloat(document.getElementById('aliquota-ir').value) || 0;
    const percentualDivida = parseFloat(document.getElementById('percentual-divida').value) || 0;
    
    // Cálculo do custo do capital próprio (Ke) usando CAPM
    const custoCapitalProprio = taxaLivreRisco + beta * premioRiscoMercado;
    
    // Cálculo do custo da dívida líquido de impostos (Kd)
    const custoDividaLiquido = custoDivida * (1 - aliquotaIr / 100);
    
    // Cálculo do WACC
    const percentualCapitalProprio = 100 - percentualDivida;
    const wacc = (custoCapitalProprio * percentualCapitalProprio / 100) + 
                 (custoDividaLiquido * percentualDivida / 100);
    
    document.getElementById('wacc-calculado').value = wacc.toFixed(2);
    
    alert('WACC calculado com sucesso: ' + wacc.toFixed(2) + '%');
}

// Salvar dados dos parâmetros
function saveParametrosData() {
    userData.parametros = {
        periodoProjecao: parseInt(document.getElementById('periodo-projecao').value) || 5,
        taxaCrescimentoPerpet: parseFloat(document.getElementById('taxa-crescimento-perpetuidade').value) || 0,
        taxaLivreRisco: parseFloat(document.getElementById('taxa-livre-risco').value) || 0,
        premioRiscoMercado: parseFloat(document.getElementById('premio-risco-mercado').value) || 0,
        beta: parseFloat(document.getElementById('beta').value) || 0,
        custoDivida: parseFloat(document.getElementById('custo-divida').value) || 0,
        aliquotaIr: parseFloat(document.getElementById('aliquota-ir').value) || 0,
        percentualDivida: parseFloat(document.getElementById('percentual-divida').value) || 0,
        waccCalculado: parseFloat(document.getElementById('wacc-calculado').value) || 0,
        cenarioBase: document.getElementById('cenario-base').checked,
        cenarioOtimista: document.getElementById('cenario-otimista').checked,
        cenarioPessimista: document.getElementById('cenario-pessimista').checked,
        ajusteReceitaOtimista: parseFloat(document.getElementById('ajuste-receita-otimista').value) || 0,
        ajusteReceitaPessimista: parseFloat(document.getElementById('ajuste-receita-pessimista').value) || 0,
        ajusteCustosOtimista: parseFloat(document.getElementById('ajuste-custos-otimista').value) || 0,
        ajusteCustosPessimista: parseFloat(document.getElementById('ajuste-custos-pessimista').value) || 0
    };
    
    // Salvar no localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    
    alert('Parâmetros de valuation salvos com sucesso!');
}

// Realizar valuation
function performValuation() {
    // Verificar se temos dados suficientes
    if (!userData.dre || !userData.parametros || !userData.parametros.waccCalculado) {
        alert('Por favor, preencha os dados do DRE e calcule o WACC antes de realizar o valuation.');
        return;
    }
    
    // Obter parâmetros
    const periodoProjecao = userData.parametros.periodoProjecao;
    const wacc = userData.parametros.waccCalculado / 100;
    const taxaCrescimentoPerpet = userData.parametros.taxaCrescimentoPerpet / 100;
    
    // Obter último ano de DRE disponível
    const anosDisponiveis = Object.keys(userData.dre);
    if (anosDisponiveis.length === 0) {
        alert('Não há dados de DRE disponíveis. Por favor, preencha o DRE antes de realizar o valuation.');
        return;
    }
    
    const ultimoAno = Math.max(...anosDisponiveis.map(Number));
    const dreBase = userData.dre[ultimoAno];
    
    // Calcular fluxos de caixa para cada cenário
    const fluxosCaixaBase = calcularFluxosCaixa(dreBase, periodoProjecao, 0, 0);
    const fluxosCaixaOtimista = calcularFluxosCaixa(
        dreBase, 
        periodoProjecao, 
        userData.parametros.ajusteReceitaOtimista / 100, 
        userData.parametros.ajusteCustosOtimista / 100
    );
    const fluxosCaixaPessimista = calcularFluxosCaixa(
        dreBase, 
        periodoProjecao, 
        userData.parametros.ajusteReceitaPessimista / 100, 
        userData.parametros.ajusteCustosPessimista / 100
    );
    
    // Calcular valor presente dos fluxos de caixa
    const vpFluxosCaixaBase = calcularVPFluxosCaixa(fluxosCaixaBase, wacc);
    const vpFluxosCaixaOtimista = calcularVPFluxosCaixa(fluxosCaixaOtimista, wacc);
    const vpFluxosCaixaPessimista = calcularVPFluxosCaixa(fluxosCaixaPessimista, wacc);
    
    // Calcular valor da perpetuidade
    const perpetuidadeBase = calcularPerpetuidadeGordon(fluxosCaixaBase[periodoProjecao - 1], wacc, taxaCrescimentoPerpet);
    const perpetuidadeOtimista = calcularPerpetuidadeGordon(fluxosCaixaOtimista[periodoProjecao - 1], wacc, taxaCrescimentoPerpet);
    const perpetuidadePessimista = calcularPerpetuidadeGordon(fluxosCaixaPessimista[periodoProjecao - 1], wacc, taxaCrescimentoPerpet);
    
    // Calcular valor presente da perpetuidade
    const vpPerpetuidadeBase = perpetuidadeBase / Math.pow(1 + wacc, periodoProjecao);
    const vpPerpetuidadeOtimista = perpetuidadeOtimista / Math.pow(1 + wacc, periodoProjecao);
    const vpPerpetuidadePessimista = perpetuidadePessimista / Math.pow(1 + wacc, periodoProjecao);
    
    // Calcular valor total da empresa
    const valorEmpresaBase = vpFluxosCaixaBase + vpPerpetuidadeBase;
    const valorEmpresaOtimista = vpFluxosCaixaOtimista + vpPerpetuidadeOtimista;
    const valorEmpresaPessimista = vpFluxosCaixaPessimista + vpPerpetuidadePessimista;
    
    // Armazenar resultados
    userData.resultados = {
        valorBase: valorEmpresaBase,
        valorOtimista: valorEmpresaOtimista,
        valorPessimista: valorEmpresaPessimista,
        fluxosCaixaBase: fluxosCaixaBase,
        fluxosCaixaOtimista: fluxosCaixaOtimista,
        fluxosCaixaPessimista: fluxosCaixaPessimista,
        vpFluxosCaixaBase: vpFluxosCaixaBase,
        vpPerpetuidadeBase: vpPerpetuidadeBase
    };
    
    // Salvar no localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Exibir resultados
    document.getElementById('valor-base').textContent = formatCurrency(valorEmpresaBase);
    document.getElementById('valor-otimista').textContent = formatCurrency(valorEmpresaOtimista);
    document.getElementById('valor-pessimista').textContent = formatCurrency(valorEmpresaPessimista);
    
    // Mostrar container de resultados
    document.getElementById('resultados-container').style.display = 'block';
    
    // Criar gráficos
    createCharts(fluxosCaixaBase, vpFluxosCaixaBase, vpPerpetuidadeBase, valorEmpresaBase, valorEmpresaOtimista, valorEmpresaPessimista);
}

// Calcular fluxos de caixa projetados
function calcularFluxosCaixa(dreBase, periodoProjecao, ajusteReceita, ajusteCustos) {
    const fluxosCaixa = [];
    
    // Valores iniciais
    let receita = dreBase.receitaLiquida;
    let custos = dreBase.custoVendas;
    let despesas = dreBase.despesasOperacionais;
    
    // Taxa de crescimento anual (simplificada)
    const taxaCrescimentoReceita = 0.05; // 5% ao ano
    const taxaCrescimentoCustos = 0.04; // 4% ao ano
    const taxaCrescimentoDespesas = 0.03; // 3% ao ano
    
    // Ajustar taxas de crescimento com base nos ajustes de cenário
    const taxaCrescimentoReceitaAjustada = taxaCrescimentoReceita + ajusteReceita;
    const taxaCrescimentoCustosAjustada = taxaCrescimentoCustos + ajusteCustos;
    
    // Projetar fluxos de caixa
    for (let i = 0; i < periodoProjecao; i++) {
        // Projetar receita, custos e despesas
        if (i > 0) {
            receita *= (1 + taxaCrescimentoReceitaAjustada);
            custos *= (1 + taxaCrescimentoCustosAjustada);
            despesas *= (1 + taxaCrescimentoDespesas);
        }
        
        // Calcular EBIT
        const ebit = receita - custos - despesas;
        
        // Calcular impostos (simplificado)
        const impostos = ebit * 0.34; // Alíquota de 34%
        
        // Calcular NOPAT (Net Operating Profit After Taxes)
        const nopat = ebit - impostos;
        
        // Adicionar depreciação (simplificado - assumindo 5% da receita)
        const depreciacao = receita * 0.05;
        
        // Subtrair investimentos em capital (simplificado - assumindo 8% da receita)
        const capex = receita * 0.08;
        
        // Subtrair investimentos em capital de giro (simplificado - assumindo 2% da receita)
        const varCapitalGiro = receita * 0.02;
        
        // Calcular fluxo de caixa livre
        const fluxoCaixaLivre = nopat + depreciacao - capex - varCapitalGiro;
        
        fluxosCaixa.push(fluxoCaixaLivre);
    }
    
    return fluxosCaixa;
}

// Calcular valor presente dos fluxos de caixa
function calcularVPFluxosCaixa(fluxosCaixa, wacc) {
    let valorPresente = 0;
    
    for (let i = 0; i < fluxosCaixa.length; i++) {
        valorPresente += fluxosCaixa[i] / Math.pow(1 + wacc, i + 1);
    }
    
    return valorPresente;
}

// Calcular perpetuidade usando o modelo de Gordon
function calcularPerpetuidadeGordon(ultimoFluxoCaixa, wacc, taxaCrescimento) {
    return ultimoFluxoCaixa * (1 + taxaCrescimento) / (wacc - taxaCrescimento);
}

// Criar gráficos
function createCharts(fluxosCaixaBase, vpFluxosCaixaBase, vpPerpetuidadeBase, valorBase, valorOtimista, valorPessimista) {
    // Gráfico de comparação de cenários
    const ctxComparacao = document.getElementById('chart-comparacao').getContext('2d');
    new Chart(ctxComparacao, {
        type: 'bar',
        data: {
            labels: ['Pessimista', 'Base', 'Otimista'],
            datasets: [{
                label: 'Valor da Empresa (R$)',
                data: [valorPessimista, valorBase, valorOtimista],
                backgroundColor: [
                    '#E74C3C',
                    '#F39C12',
                    '#27AE60'
                ],
                borderColor: [
                    '#C0392B',
                    '#D68910',
                    '#1E8449'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return formatCurrency(context.raw);
                        }
                    }
                }
            }
        }
    });
    
    // Gráfico de fluxo de caixa projetado
    const ctxFluxoCaixa = document.getElementById('chart-fluxo-caixa').getContext('2d');
    const anos = [];
    const anoAtual = new Date().getFullYear();
    for (let i = 0; i < fluxosCaixaBase.length; i++) {
        anos.push(anoAtual + i);
    }
    
    new Chart(ctxFluxoCaixa, {
        type: 'line',
        data: {
            labels: anos,
            datasets: [{
                label: 'Fluxo de Caixa Projetado',
                data: fluxosCaixaBase,
                backgroundColor: 'rgba(46, 134, 193, 0.2)',
                borderColor: 'rgba(46, 134, 193, 1)',
                borderWidth: 2,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return formatCurrency(context.raw);
                        }
                    }
                }
            }
        }
    });
    
    // Gráfico de composição do valor
    const ctxComposicao = document.getElementById('chart-composicao').getContext('2d');
    new Chart(ctxComposicao, {
        type: 'pie',
        data: {
            labels: ['Valor Presente dos Fluxos de Caixa', 'Valor Presente da Perpetuidade'],
            datasets: [{
                data: [vpFluxosCaixaBase, vpPerpetuidadeBase],
                backgroundColor: [
                    'rgba(46, 134, 193, 0.7)',
                    'rgba(243, 156, 18, 0.7)'
                ],
                borderColor: [
                    'rgba(46, 134, 193, 1)',
                    'rgba(243, 156, 18, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${formatCurrency(value)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Formatar valor como moeda
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

// Exportar para PDF
function exportToPDF() {
    alert('Funcionalidade de exportação para PDF será implementada em uma versão futura.');
}

// Exportar para Excel
function exportToExcel() {
    alert('Funcionalidade de exportação para Excel será implementada em uma versão futura.');
}

// Carregar dados do usuário do localStorage
function loadUserData() {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
        userData = JSON.parse(storedData);
        
        // Preencher formulários com dados salvos
        if (userData.empresa) {
            document.getElementById('razao-social').value = userData.empresa.razaoSocial || '';
            document.getElementById('cnpj').value = userData.empresa.cnpj || '';
            document.getElementById('endereco').value = userData.empresa.endereco || '';
            document.getElementById('setor').value = userData.empresa.setor || '';
            document.getElementById('data-analise').value = userData.empresa.dataAnalise || '';
        }
        
        // Preencher outros formulários conforme necessário...
    }
}
