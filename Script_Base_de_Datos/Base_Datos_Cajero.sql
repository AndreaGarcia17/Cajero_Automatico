/*Base de datos para un cajero automatico*/

create database Cajero;
use tienda;

# drop table Cajero.Direccion; 
create table Cajero.Direccion(
                      CP int not null,
                      Municipio varchar(50)not null,
					  Estado varchar(50)not null,
                      Ciudad varchar(50)not null,
                      Pais varchar(50)not null,
                      primary KEY(CP));
 

# drop table Cajero.Cliente; 
create table Cajero.Cliente(
                      ID_Cliente int not null auto_increment,
					  Nombre  varchar(40)not null,
                      Apellido_P varchar(40) not null,
					  Apellido_M varchar(40) not null,
					  sexo varchar(1)not null,
                      CURP varchar (18) not null,
				      Telefono long not null,
                      CP int not null,
                      Colonia varchar(50)not null,
                      primary KEY(ID_Cliente),
                      foreign key(CP) references Direccion(CP));
                      
# drop table Cajero.Cuenta;
create table Cajero.Cuenta(
                      ID_Cliente int not null,
                      No_Cuenta int (18) not null,
                      Tipo_Cuenta varchar(15)not null,
                      Saldo int,
                      primary KEY(No_Cuenta),
                      foreign key(ID_Cliente) references Cliente(ID_Cliente));                     
                      
# drop table Cajero.Tarjeta;
create table Cajero.Tarjeta(
                      No_Cuenta int not null,
                      No_Tarjeta int (16) not null,
                      Fecha_Expiracion varchar(10) not null,
                      Clave varchar(8) not null,
                      primary KEY(No_Tarjeta),
                      foreign key(No_Cuenta) references Cuenta(No_Cuenta));                        
                      
                      
# drop table Cajero.Cajero_D;
create table Cajero.Cajero_D(
                      ID_Cajero int not null auto_increment,
                      No_Tarjeta int not null,
                      Clave varchar(8) not null,
                      primary KEY(ID_Cajero),
                      foreign key(No_Tarjeta) references Tarjeta(No_Tarjeta));                       
                      
					                      
                      
# drop table Cajero.Consular_Saldo;
create table Cajero.Consular_Saldo(
					  No_Cuenta int (18) not null,
                      ID_Cajero int not null,
                      ID_Consular_Saldo int not null auto_increment,
                      Fecha datetime not null default current_timestamp,
                      Tipo_Movimiento varchar(20) not null,
                      primary KEY(ID_Consular_Saldo),
                      foreign key(No_Cuenta) references Cuenta(No_Cuenta),
                      foreign key(ID_Cajero) references Cajero_D(ID_Cajero));  
                      
# drop table Cajero.Retiro_Saldo;
create table Cajero.Retiro_Saldo(
					  No_Cuenta int (18) not null,
                      ID_Cajero int not null,
                      ID_Retiro_Saldo int not null auto_increment,
                      Saldo_Retirar int not null,
                      Fecha datetime not null default current_timestamp,
                      Tipo_Movimiento varchar(20) not null,
                      primary KEY(ID_Retiro_Saldo),
                      foreign key(No_Cuenta) references Cuenta(No_Cuenta),
                      foreign key(ID_Cajero) references Cajero_D(ID_Cajero));                      
                      
                      
# drop table Cajero.Transferencia;
create table Cajero.Transferencia(
					  No_Cuenta int (18) not null,
                      ID_Cajero int not null,
                      ID_Transferencia int not null auto_increment,
                      Saldo_Transferir int not null,
                      No_Cuenta_Transferir int (18) not null,
                      Fecha datetime not null default current_timestamp,
                      Tipo_Movimiento varchar(20) not null,
                      primary KEY(ID_Transferencia),
                      foreign key(No_Cuenta) references Cuenta(No_Cuenta),
                      foreign key(ID_Cajero) references Cajero_D(ID_Cajero));                       


# drop table Cajero.Deposito;
create table Cajero.Deposito(
					  No_Cuenta int (18) not null,
                      ID_Cajero int not null,
                      ID_Deposito int not null auto_increment,
                      Saldo_Depositar int not null,
                      Fecha datetime not null default current_timestamp,
                      Tipo_Movimiento varchar(20) not null,
                      primary KEY(ID_Deposito),
                      foreign key(No_Cuenta) references Cuenta(No_Cuenta),
                      foreign key(ID_Cajero) references Cajero_D(ID_Cajero));   
                      
drop table Cajero.Estado_Cuenta;
create table Cajero.Estado_Cuenta(
					  ID_Estado_Cuenta int not null auto_increment,
                      ID_Cajero int not null,
                      No_Cuenta int (18) not null,
                      ID_Retiro_Saldo int,
                      ID_Transferencia int,
                      ID_Deposito int,
                      primary KEY(ID_Estado_Cuenta),
                      foreign key(No_Cuenta) references Cuenta(No_Cuenta),
                      foreign key(ID_Retiro_Saldo) references Retiro_Saldo(ID_Retiro_Saldo),
                      foreign key(ID_Transferencia) references Transferencia(ID_Transferencia),
                      foreign key(ID_Cajero) references Cajero_D(ID_Cajero),
                      foreign key(ID_Deposito) references Deposito(ID_Deposito));                        