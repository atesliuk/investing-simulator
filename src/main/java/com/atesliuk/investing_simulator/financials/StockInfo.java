package com.atesliuk.investing_simulator.financials;

import java.time.LocalDateTime;

public class StockInfo {

    private String companyName;
    private String symbol;
    private Long price;
    private String dailyChangePercents;
    private String exchange;
    private LocalDateTime lastUpdated;

    public StockInfo() {
    }

    public StockInfo(String companyName, String symbol, Long price, String dailyChangePercents, String exchange, LocalDateTime lastUpdated) {
        this.companyName = companyName;
        this.symbol = symbol;
        this.price = price;
        this.dailyChangePercents = dailyChangePercents;
        this.exchange = exchange;
        this.lastUpdated = lastUpdated;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getDailyChangePercents() {
        return dailyChangePercents;
    }

    public void setDailyChangePercents(String dailyChangePercents) {
        double change = Double.parseDouble(dailyChangePercents.substring(0, dailyChangePercents.length()-1));
        change = round(change, 1);
        if (change>0)
            this.dailyChangePercents = "+"+change+"%";
        else
            this.dailyChangePercents = change+"%";
    }

    public String getExchange() {
        return exchange;
    }

    public void setExchange(String exchange) {
        this.exchange = exchange;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    @Override
    public String toString() {
        return "StockInfo{" +
                "companyName='" + companyName + '\'' +
                ", symbol='" + symbol + '\'' +
                ", price=" + price +
                ", dailyChangePercents=" + dailyChangePercents +
                ", exchange=" + exchange +
                ", lastUpdated=" + lastUpdated +
                '}';
    }

    public static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        long factor = (long) Math.pow(10, places);
        value = value * factor;
        long tmp = Math.round(value);
        return (double) tmp / factor;
    }

}
