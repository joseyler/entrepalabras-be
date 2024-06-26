const reportesQueries = {
  reportePalabras: (orderBy: string, direction: string): string => `
        select 
            p.fecha,
            p.palabraID,
            p.maxIntentos,
            pa.palabra,
            count(j.jugadaID) as cantidadJugadas 
            from palabrasdia p 
            join palabras pa on pa.palabraID =p.palabraID 
            left join jugadas j on j.fecha = p.fecha 
            group by p.fecha, p.palabraID, p.maxIntentos,pa.palabra
            order by ${orderBy} ${direction}
            limit ? Offset ?
    `,
  reportePalabrasTotal: `
        select count(fecha) as registrosTotales
        from 
        (select 
        p.fecha
        from palabrasdia p 
        join palabras pa on pa.palabraID =p.palabraID 
        left join jugadas j on j.fecha = p.fecha 
        group by p.fecha, p.palabraID, p.maxIntentos,pa.palabra
        ) as reporteData
    `,
};

export default reportesQueries;
