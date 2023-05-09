
function simulador_pf( capital , plazo) {
    capital = parseFloat (capital);

    plazo = parseInt (plazo);

    let plazo_fijo = 0;

    if (capital > 0 && plazo == 30) {
        plazo_fijo = capital + (capital * 0.070);
        return plazo_fijo
    }

    else if (capital > 0 && plazo == 90) {
        plazo_fijo = capital + (capital * 0.20);
        return plazo_fijo
    }

    else if (capital > 0 && plazo == 180) {
        plazo_fijo = capital + (capital * 0.50);
        return plazo_fijo 
    }

    else if (capital > 0 && plazo == 365) {
        plazo_fijo = capital + (capital * 1.15);
        return plazo_fijo 
    }
}

function cliente_nacion (plazo_fijo , usuario) {
    if (usuario == "SI"){
        let beneficio_nacion = plazo_fijo + (plazo_fijo * 0.15); 
        return beneficio_nacion
    }
    else {
        return 0
    }
}


console.log ("Bienvenido/a a KM-Simulador Plazo Fijo");

let capital = "";

while (capital != "SALIR") {
    capital = prompt ("Ingrese cuánto desea invertir o ingrese SALIR para finalizar");

    if (capital != "SALIR") {
        let usuario = prompt ("Es cliente del Banco Nación: SI o NO");
    
        let plazo = prompt ("Ingrese el plazo 30,90,180 o 365");
    
        let monto_final = simulador_pf (capital , plazo);
    
        let monto_beneficio = cliente_nacion (monto_final , usuario);
    
        console.log ("Invertiste: " , capital);
        console.log ("En un plazo de días: " , plazo);
        console.log ("Vas a recibir: " , monto_final);
    
        if (monto_beneficio != 0) {
            console.log ("Por ser cliente del Banco Nación: " , monto_beneficio);
        }
    
    }
}