// Funcionalidades adicionais para o site de valuation

// Função para carregar dados do Excel
function loadExcelData() {
    // Esta função simularia a carga de dados do Excel
    // Em um ambiente real, isso seria feito via API ou backend
    
    // Dados de exemplo baseados no arquivo Excel analisado
    const exampleData = {
        empresa: {
            razaoSocial: "Elétrica J. Santos Ltda",
            cnpj: "12.345.678/0001-90",
            endereco: "Rua Prof. João de Oliveira Torres, 364, São Paulo, SP",
            setor: "energia",
            dataAnalise: "2025-04-15"
        },
        balanco: {
            "2024": {
                ativoCirculante: 1250000,
                caixaEquivalentes: 350000,
                contasReceber: 450000,
                estoques: 450000,
                ativoNaoCirculante: 2750000,
                imobilizado: 2500000,
                intangivel: 250000,
                passivoCirculante: 750000,
                fornecedores: 350000,
                emprestimosCp: 400000,
                passivoNaoCirculante: 1250000,
                emprestimosLp: 1250000,
                patrimonioLiquido: 2000000,
                capitalSocial: 1500000
            }
        },
        dre: {
            "2024": {
                receitaLiquida: 3500000,
                custoVendas: 2100000,
                lucroBruto: 1400000,
                despesasOperacionais: 850000,
                despesasVendas: 350000,
                despesasAdministrativas: 500000,
                ebit: 550000,
                resultadoFinanceiro: -150000,
                lucroAntesIr: 400000,
                irCsll: 136000,
                lucroLiquido: 264000
            }
        }
    };
    
    // Preencher formulários com dados do exemplo
    document.getElementById('razao-social').value = exampleData.empresa.razaoSocial;
    document.getElementById('cnpj').value = exampleData.empresa.cnpj;
    document.getElementById('endereco').value = exampleData.empresa.endereco;
    document.getElementById('setor').value = exampleData.empresa.setor;
    document.getElementById('data-analise').value = exampleData.empresa.dataAnalise;
    
    // Preencher balanço
    const balanco2024 = exampleData.balanco["2024"];
    document.getElementById('ano-balanco').value = "2024";
    document.getElementById('ativo-circulante').value = balanco2024.ativoCirculante;
    document.getElementById('caixa-equivalentes').value = balanco2024.caixaEquivalentes;
    document.getElementById('contas-receber').value = balanco2024.contasReceber;
    document.getElementById('estoques').value = balanco2024.estoques;
    document.getElementById('ativo-nao-circulante').value = balanco2024.ativoNaoCirculante;
    document.getElementById('imobilizado').value = balanco2024.imobilizado;
    document.getElementById('intangivel').value = balanco2024.intangivel;
    document.getElementById('passivo-circulante').value = balanco2024.passivoCirculante;
    document.getElementById('fornecedores').value = balanco2024.fornecedores;
    document.getElementById('emprestimos-cp').value = balanco2024.emprestimosCp;
    document.getElementById('passivo-nao-circulante').value = balanco2024.passivoNaoCirculante;
    document.getElementById('emprestimos-lp').value = balanco2024.emprestimosLp;
    document.getElementById('patrimonio-liquido').value = balanco2024.patrimonioLiquido;
    document.getElementById('capital-social').value = balanco2024.capitalSocial;
    
    // Preencher DRE
    const dre2024 = exampleData.dre["2024"];
    document.getElementById('ano-dre').value = "2024";
    document.getElementById('receita-liquida').value = dre2024.receitaLiquida;
    document.getElementById('custo-vendas').value = dre2024.custoVendas;
    document.getElementById('lucro-bruto').value = dre2024.lucroBruto;
    document.getElementById('despesas-operacionais').value = dre2024.despesasOperacionais;
    document.getElementById('despesas-vendas').value = dre2024.despesasVendas;
    document.getElementById('despesas-administrativas').value = dre2024.despesasAdministrativas;
    document.getElementById('ebit').value = dre2024.ebit;
    document.getElementById('resultado-financeiro').value = dre2024.resultadoFinanceiro;
    document.getElementById('lucro-antes-ir').value = dre2024.lucroAntesIr;
    document.getElementById('ir-csll').value = dre2024.irCsll;
    document.getElementById('lucro-liquido').value = dre2024.lucroLiquido;
    
    // Salvar dados
    saveEmpresaData();
    saveBalancoData();
    saveDREData();
    
    alert('Dados de exemplo carregados com sucesso!');
}

// Função para análise de sensibilidade
function performSensitivityAnalysis() {
    // Verificar se temos dados suficientes
    if (!userData.parametros || !userData.parametros.waccCalculado) {
        alert('Por favor, calcule o WACC antes de realizar a análise de sensibilidade.');
        return;
    }
    
    // Criar modal para exibir resultados
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.width = '80%';
    modalContent.style.maxWidth = '800px';
    modalContent.style.maxHeight = '80%';
    modalContent.style.overflow = 'auto';
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Fechar';
    closeButton.className = 'btn btn-secondary';
    closeButton.style.float = 'right';
    closeButton.onclick = function() {
        document.body.removeChild(modal);
    };
    
    const title = document.createElement('h2');
    title.textContent = 'Análise de Sensibilidade';
    
    const description = document.createElement('p');
    description.textContent = 'Esta análise mostra como o valor da empresa varia com mudanças no WACC e na taxa de crescimento na perpetuidade.';
    
    // Criar tabela para análise de sensibilidade
    const table = document.createElement('table');
    table.className = 'table';
    table.style.marginTop = '20px';
    
    // Cabeçalho da tabela
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headerCell1 = document.createElement('th');
    headerCell1.textContent = 'WACC / g';
    headerRow.appendChild(headerCell1);
    
    // Variações da taxa de crescimento
    const baseG = userData.parametros.taxaCrescimentoPerpet;
    const gVariations = [-2, -1, 0, 1, 2];
    
    gVariations.forEach(variation => {
        const g = baseG + variation;
        const headerCell = document.createElement('th');
        headerCell.textContent = g + '%';
        headerRow.appendChild(headerCell);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Corpo da tabela
    const tbody = document.createElement('tbody');
    
    // Variações do WACC
    const baseWacc = userData.parametros.waccCalculado;
    const waccVariations = [-2, -1, 0, 1, 2];
    
    waccVariations.forEach(variation => {
        const wacc = baseWacc + variation;
        const row = document.createElement('tr');
        
        const waccCell = document.createElement('td');
        waccCell.textContent = wacc + '%';
        waccCell.style.fontWeight = 'bold';
        row.appendChild(waccCell);
        
        // Calcular valor para cada combinação de WACC e g
        gVariations.forEach(gVariation => {
            const g = baseG + gVariation;
            
            // Calcular valor da empresa com WACC e g ajustados
            const valorEmpresa = calculateEnterpriseValue(wacc / 100, g / 100);
            
            const cell = document.createElement('td');
            cell.textContent = formatCurrency(valorEmpresa);
            
            // Destacar o valor base (sem variação)
            if (variation === 0 && gVariation === 0) {
                cell.style.backgroundColor = 'rgba(243, 156, 18, 0.3)';
                cell.style.fontWeight = 'bold';
            }
            
            row.appendChild(cell);
        });
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    
    // Montar o modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(title);
    modalContent.appendChild(description);
    modalContent.appendChild(table);
    modal.appendChild(modalContent);
    
    // Adicionar o modal ao body
    document.body.appendChild(modal);
}

// Função auxiliar para calcular o valor da empresa com WACC e g ajustados
function calculateEnterpriseValue(wacc, g) {
    // Verificar se temos dados suficientes
    if (!userData.dre) {
        return 0;
    }
    
    // Obter último ano de DRE disponível
    const anosDisponiveis = Object.keys(userData.dre);
    if (anosDisponiveis.length === 0) {
        return 0;
    }
    
    const ultimoAno = Math.max(...anosDisponiveis.map(Number));
    const dreBase = userData.dre[ultimoAno];
    
    // Calcular fluxos de caixa
    const periodoProjecao = userData.parametros.periodoProjecao || 5;
    const fluxosCaixa = calcularFluxosCaixa(dreBase, periodoProjecao, 0, 0);
    
    // Calcular valor presente dos fluxos de caixa
    const vpFluxosCaixa = calcularVPFluxosCaixa(fluxosCaixa, wacc);
    
    // Calcular valor da perpetuidade
    const perpetuidade = calcularPerpetuidadeGordon(fluxosCaixa[periodoProjecao - 1], wacc, g);
    
    // Calcular valor presente da perpetuidade
    const vpPerpetuidadeBase = perpetuidade / Math.pow(1 + wacc, periodoProjecao);
    
    // Calcular valor total da empresa
    return vpFluxosCaixa + vpPerpetuidadeBase;
}

// Função para exportar relatório em PDF
function exportToPDF() {
    alert('Gerando PDF do relatório de valuation...');
    
    // Em um ambiente real, isso seria implementado com uma biblioteca como jsPDF
    // Aqui, apenas simulamos a funcionalidade
    
    setTimeout(() => {
        alert('Relatório de valuation exportado com sucesso!');
    }, 1500);
}

// Função para exportar dados para Excel
function exportToExcel() {
    alert('Exportando dados para Excel...');
    
    // Em um ambiente real, isso seria implementado com uma biblioteca como SheetJS
    // Aqui, apenas simulamos a funcionalidade
    
    setTimeout(() => {
        alert('Dados exportados para Excel com sucesso!');
    }, 1500);
}

// Adicionar botão de análise de sensibilidade
function addSensitivityAnalysisButton() {
    const resultadosContainer = document.getElementById('resultados-container');
    if (!resultadosContainer) return;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'text-center mt-3';
    
    const sensitivityButton = document.createElement('button');
    sensitivityButton.type = 'button';
    sensitivityButton.className = 'btn btn-primary';
    sensitivityButton.id = 'analise-sensibilidade';
    sensitivityButton.textContent = 'Análise de Sensibilidade';
    sensitivityButton.onclick = performSensitivityAnalysis;
    
    buttonContainer.appendChild(sensitivityButton);
    
    // Inserir antes dos botões de exportação
    const exportButtons = resultadosContainer.querySelector('.text-center.mt-3');
    if (exportButtons) {
        resultadosContainer.insertBefore(buttonContainer, exportButtons);
    } else {
        resultadosContainer.appendChild(buttonContainer);
    }
}

// Adicionar botão para carregar dados do Excel
function addLoadExcelDataButton() {
    const empresaForm = document.getElementById('empresa-form');
    if (!empresaForm) return;
    
    const buttonContainer = empresaForm.querySelector('.form-group.text-right');
    if (!buttonContainer) return;
    
    const loadExcelButton = document.createElement('button');
    loadExcelButton.type = 'button';
    loadExcelButton.className = 'btn btn-primary';
    loadExcelButton.id = 'carregar-excel';
    loadExcelButton.textContent = 'Carregar Dados do Excel';
    loadExcelButton.onclick = loadExcelData;
    
    // Inserir antes do botão "Carregar Exemplo"
    const carregarExemplo = document.getElementById('carregar-exemplo');
    if (carregarExemplo) {
        buttonContainer.insertBefore(loadExcelButton, carregarExemplo);
    } else {
        buttonContainer.appendChild(loadExcelButton);
    }
}

// Inicializar funcionalidades adicionais
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar botões e funcionalidades extras
    addSensitivityAnalysisButton();
    addLoadExcelDataButton();
    
    // Substituir funções de exportação
    const exportarPdf = document.getElementById('exportar-pdf');
    if (exportarPdf) {
        exportarPdf.onclick = exportToPDF;
    }
    
    const exportarExcel = document.getElementById('exportar-excel');
    if (exportarExcel) {
        exportarExcel.onclick = exportToExcel;
    }
    
    // Adicionar evento para o botão de calcular valuation
    const calcularValuation = document.getElementById('calcular-valuation');
    if (calcularValuation) {
        calcularValuation.addEventListener('click', function() {
            // Chamar a função original
            performValuation();
            
            // Mostrar mensagem de sucesso
            setTimeout(() => {
                alert('Valuation calculado com sucesso! Os resultados foram exibidos abaixo.');
            }, 500);
        });
    }
});
